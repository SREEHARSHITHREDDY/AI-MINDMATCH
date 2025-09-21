import { supabase } from "@/integrations/supabase/client";

export interface ProfileData {
  name: string;
  bio: string;
  lifestyle_interests: string[];
  purpose: string;
  interests: string[];
  hobbies: string[];
}

export const saveProfile = async (profileData: ProfileData) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      full_name: profileData.name,
      bio: profileData.bio,
      lifestyle_interests: profileData.lifestyle_interests,
      purpose: profileData.purpose,
      interests: profileData.interests,
      hobbies: profileData.hobbies,
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    throw error;
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
    .eq('id', user.id)
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