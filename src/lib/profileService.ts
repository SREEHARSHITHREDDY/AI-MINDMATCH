import { supabase } from "@/integrations/supabase/client";

export interface ProfileData {
  name: string;
  yearOfStudy: string;
  domainKnowledge: string;
  workingStyle: string;
  personalityType: string;
  communicationStyle: string;
  decisionMaking: string;
  techBuzzword: string;
  hobbies: string;
  skills: {
    AI: number;
    Finance: number;
    Design: number;
    Marketing: number;
    Programming: number;
  };
  interests: string;
  eventGoal: string;
  additionalInfo: string;
}

export const saveProfile = async (profileData: ProfileData) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      name: profileData.name,
      year_of_study: profileData.yearOfStudy,
      domain_knowledge: profileData.domainKnowledge,
      working_style: profileData.workingStyle,
      personality_type: profileData.personalityType,
      communication_style: profileData.communicationStyle,
      decision_making: profileData.decisionMaking,
      tech_buzzword: profileData.techBuzzword,
      hobbies: profileData.hobbies,
      interests: profileData.interests,
      event_goal: profileData.eventGoal,
      additional_info: profileData.additionalInfo,
      skills: profileData.skills,
    })
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  // Register for the current event
  const { data: currentEvent } = await supabase
    .from('events')
    .select('id')
    .eq('matching_completed', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (currentEvent && data) {
    await supabase
      .from('event_registrations')
      .insert({
        event_id: currentEvent.id,
        user_id: user.id,
        profile_id: data.id,
      });
  }

  return data;
};

export const getProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getMatches = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      matched_profile:profiles!matches_matched_user_id_fkey(*)
    `)
    .eq('user_id', user.id)
    .order('match_score', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};