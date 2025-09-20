export interface UserProfile {
  id?: string;
  user_id: string;
  name: string;
  email?: string;
  gender: string;
  date_of_birth: string;
  bio: string;
  profile_picture_url?: string;
  
  // Purpose-based fields
  purpose: 'relationship' | 'friendship' | 'professional' | 'explore';
  relationship_goals?: string;
  hangout_activities?: string;
  industry_field?: string;
  
  // Mandatory sections
  lifestyle_interests: string[];
  personality_traits: string[];
  important_values: string[];
  dealbreakers: string[];
  
  // Skills and preferences
  skills: {
    AI: number;
    Finance: number;
    Design: number;
    Marketing: number;
    Programming: number;
  };
  interests: string;
  hobbies?: string;
  
  // Legacy fields (keeping for compatibility)
  year_of_study: string;
  domain_knowledge: string;
  working_style: string;
  personality_type: string;
  communication_style: string;
  decision_making: string;
  tech_buzzword: string;
  event_goal: string;
  additional_info?: string;
  
  // Age preferences
  age_range_min: number;
  age_range_max: number;
  
  // AI matching
  ai_compatibility_score: number;
  completed_steps: string[];
  
  created_at?: string;
  updated_at?: string;
}

export interface OnboardingData {
  // Step 1: Basic Info
  name: string;
  email: string;
  password: string;
  profile_picture?: File;
  
  // Step 2: Purpose Selection
  purpose: 'relationship' | 'friendship' | 'professional' | 'explore';
  
  // Step 3: Category-specific questions
  gender: string;
  date_of_birth: string;
  bio: string;
  relationship_goals?: string;
  hangout_activities?: string;
  industry_field?: string;
  
  // Step 4: Lifestyle & Interests (Mandatory)
  lifestyle_interests: string[];
  personality_traits: string[];
  
  // Step 5: Values & Dealbreakers (Mandatory)
  important_values: string[];
  dealbreakers: string[];
  
  // Step 6: AI Matching (Mandatory)
  skills: {
    AI: number;
    Finance: number;
    Design: number;
    Marketing: number;
    Programming: number;
  };
  interests: string;
  hobbies: string;
  age_range_min: number;
  age_range_max: number;
}

export interface MatchProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  profile_picture_url?: string;
  compatibility_score: number;
  distance?: string;
}

export interface UserInteraction {
  id: string;
  user_id: string;
  target_user_id: string;
  interaction_type: 'like' | 'super_like' | 'pass' | 'match' | 'message';
  message_content?: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}
