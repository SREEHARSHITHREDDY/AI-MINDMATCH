import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Profile {
  id: string;
  user_id: string;
  name: string;
  year_of_study: string;
  domain_knowledge: string;
  working_style: string;
  personality_type: string;
  communication_style: string;
  decision_making: string;
  tech_buzzword: string;
  hobbies: string;
  interests: string;
  event_goal: string;
  additional_info: string;
  skills: {
    AI: number;
    Finance: number;
    Design: number;
    Marketing: number;
    Programming: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { eventId } = await req.json();

    // Get all profiles for the event
    const { data: registrations, error: regError } = await supabaseClient
      .from('event_registrations')
      .select(`
        profile_id,
        profiles (*)
      `)
      .eq('event_id', eventId);

    if (regError) {
      console.error('Error fetching registrations:', regError);
      throw regError;
    }

    const profiles = registrations?.map(reg => reg.profiles).filter(Boolean) as Profile[];

    if (!profiles || profiles.length < 2) {
      return new Response(JSON.stringify({ 
        error: 'Not enough profiles to generate matches' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Generating matches for ${profiles.length} profiles`);

    // Generate matches for each profile
    const allMatches = [];

    for (const profile of profiles) {
      const matches = generateMatchesForProfile(profile, profiles);
      allMatches.push(...matches);
    }

    // Insert matches into database
    const { error: matchError } = await supabaseClient
      .from('matches')
      .insert(allMatches);

    if (matchError) {
      console.error('Error inserting matches:', matchError);
      throw matchError;
    }

    // Mark event as matching completed
    const { error: eventError } = await supabaseClient
      .from('events')
      .update({ matching_completed: true })
      .eq('id', eventId);

    if (eventError) {
      console.error('Error updating event:', eventError);
      throw eventError;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      matchesGenerated: allMatches.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-matches function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateMatchesForProfile(profile: Profile, allProfiles: Profile[]) {
  const matches = [];
  const otherProfiles = allProfiles.filter(p => p.user_id !== profile.user_id);

  for (const otherProfile of otherProfiles) {
    const matchScore = calculateMatchScore(profile, otherProfile);
    const compatibilityReasons = generateCompatibilityReasons(profile, otherProfile);
    const complementarySkills = generateComplementarySkills(profile, otherProfile);

    matches.push({
      user_id: profile.user_id,
      matched_user_id: otherProfile.user_id,
      match_score: matchScore,
      compatibility_reasons: compatibilityReasons,
      complementary_skills: complementarySkills,
    });
  }

  // Sort by match score and return top 5
  return matches
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 5);
}

function calculateMatchScore(profile1: Profile, profile2: Profile): number {
  let score = 0;
  let totalFactors = 0;

  // Goal alignment (25% weight)
  if (profile1.event_goal === profile2.event_goal) {
    score += 25;
  }
  totalFactors += 25;

  // Personality compatibility (20% weight)
  const personalityScore = calculatePersonalityCompatibility(profile1, profile2);
  score += personalityScore * 0.2;
  totalFactors += 20;

  // Skills complementarity (20% weight)
  const skillsScore = calculateSkillsComplementarity(profile1, profile2);
  score += skillsScore * 0.2;
  totalFactors += 20;

  // Domain knowledge (15% weight)
  if (profile1.domain_knowledge === profile2.domain_knowledge || 
      areDomainsComplementary(profile1.domain_knowledge, profile2.domain_knowledge)) {
    score += 15;
  }
  totalFactors += 15;

  // Communication style (10% weight)
  if (profile1.communication_style === profile2.communication_style) {
    score += 10;
  }
  totalFactors += 10;

  // Tech interest (10% weight)
  if (profile1.tech_buzzword === profile2.tech_buzzword) {
    score += 10;
  }
  totalFactors += 10;

  return Math.min(Math.round(score), 100);
}

function calculatePersonalityCompatibility(profile1: Profile, profile2: Profile): number {
  let compatibility = 50; // Base compatibility

  // Introvert-Extrovert balance
  if ((profile1.personality_type === 'introvert' && profile2.personality_type === 'extrovert') ||
      (profile1.personality_type === 'extrovert' && profile2.personality_type === 'introvert')) {
    compatibility += 30; // Complementary personalities
  } else if (profile1.personality_type === profile2.personality_type) {
    compatibility += 20; // Similar personalities
  }

  // Working style compatibility
  if (profile1.working_style === 'team-player' || profile2.working_style === 'team-player') {
    compatibility += 20;
  }

  return Math.min(compatibility, 100);
}

function calculateSkillsComplementarity(profile1: Profile, profile2: Profile): number {
  let complementarity = 0;
  const skillKeys = Object.keys(profile1.skills) as Array<keyof typeof profile1.skills>;

  for (const skill of skillKeys) {
    const diff = Math.abs(profile1.skills[skill] - profile2.skills[skill]);
    
    // Perfect complementarity when one is strong (4-5) and other is weak (1-2)
    if ((profile1.skills[skill] >= 4 && profile2.skills[skill] <= 2) ||
        (profile2.skills[skill] >= 4 && profile1.skills[skill] <= 2)) {
      complementarity += 20;
    }
    // Good balance when skills are similar and high
    else if (profile1.skills[skill] >= 3 && profile2.skills[skill] >= 3 && diff <= 1) {
      complementarity += 15;
    }
  }

  return Math.min(complementarity, 100);
}

function areDomainsComplementary(domain1: string, domain2: string): boolean {
  const complementaryPairs = [
    ['tech', 'business'],
    ['analytics', 'creativity'],
    ['tech', 'management'],
    ['business', 'analytics']
  ];

  return complementaryPairs.some(pair => 
    (pair.includes(domain1) && pair.includes(domain2))
  );
}

function generateCompatibilityReasons(profile1: Profile, profile2: Profile): string[] {
  const reasons = [];

  if (profile1.event_goal === profile2.event_goal) {
    reasons.push(`Both seeking ${profile1.event_goal} opportunities`);
  }

  if (profile1.personality_type !== profile2.personality_type) {
    reasons.push(`Complementary personalities: ${profile1.personality_type} and ${profile2.personality_type}`);
  }

  if (profile1.domain_knowledge === profile2.domain_knowledge) {
    reasons.push(`Shared expertise in ${profile1.domain_knowledge}`);
  } else if (areDomainsComplementary(profile1.domain_knowledge, profile2.domain_knowledge)) {
    reasons.push(`Complementary domains: ${profile1.domain_knowledge} and ${profile2.domain_knowledge}`);
  }

  if (profile1.tech_buzzword === profile2.tech_buzzword) {
    reasons.push(`Mutual interest in ${profile1.tech_buzzword}`);
  }

  const sharedInterests = findSharedInterests(profile1.interests, profile2.interests);
  if (sharedInterests.length > 0) {
    reasons.push(`Shared interests: ${sharedInterests.slice(0, 2).join(', ')}`);
  }

  return reasons.slice(0, 4); // Limit to 4 reasons
}

function generateComplementarySkills(profile1: Profile, profile2: Profile): string[] {
  const complementary = [];
  const skillKeys = Object.keys(profile1.skills) as Array<keyof typeof profile1.skills>;

  for (const skill of skillKeys) {
    if (profile1.skills[skill] >= 4 && profile2.skills[skill] <= 2) {
      complementary.push(`${profile1.name}'s ${skill} expertise complements ${profile2.name}'s learning opportunity`);
    } else if (profile2.skills[skill] >= 4 && profile1.skills[skill] <= 2) {
      complementary.push(`${profile2.name}'s ${skill} expertise complements ${profile1.name}'s learning opportunity`);
    } else if (profile1.skills[skill] >= 4 && profile2.skills[skill] >= 4) {
      complementary.push(`Both excel in ${skill} - potential for advanced collaboration`);
    }
  }

  return complementary.slice(0, 3); // Limit to 3 skills
}

function findSharedInterests(interests1: string, interests2: string): string[] {
  const list1 = interests1.toLowerCase().split(',').map(s => s.trim());
  const list2 = interests2.toLowerCase().split(',').map(s => s.trim());
  
  return list1.filter(interest => 
    list2.some(otherInterest => 
      interest.includes(otherInterest) || otherInterest.includes(interest)
    )
  );
}