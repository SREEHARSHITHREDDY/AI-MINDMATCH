-- Update profiles table to support the new multi-step onboarding structure
-- Remove fields that are no longer needed according to requirements
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS location,
DROP COLUMN IF EXISTS occupation,
DROP COLUMN IF EXISTS match_preferences;

-- Add new purpose-based fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS purpose text CHECK (purpose IN ('relationship', 'friendship', 'professional', 'explore')),
ADD COLUMN IF NOT EXISTS relationship_goals text,
ADD COLUMN IF NOT EXISTS hangout_activities text,
ADD COLUMN IF NOT EXISTS industry_field text,
ADD COLUMN IF NOT EXISTS lifestyle_interests jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS personality_traits jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS important_values jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS dealbreakers jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS ai_compatibility_score integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS profile_picture_url text,
ADD COLUMN IF NOT EXISTS age_range_min integer DEFAULT 18,
ADD COLUMN IF NOT EXISTS age_range_max integer DEFAULT 65,
ADD COLUMN IF NOT EXISTS completed_steps jsonb DEFAULT '[]'::jsonb;

-- Create a new table for user interactions (likes, matches, messages)
CREATE TABLE IF NOT EXISTS public.user_interactions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  target_user_id uuid NOT NULL,
  interaction_type text NOT NULL CHECK (interaction_type IN ('like', 'super_like', 'pass', 'match', 'message')),
  message_content text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, target_user_id, interaction_type)
);

-- Enable RLS on user_interactions
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for user_interactions
CREATE POLICY "Users can view their own interactions"
ON public.user_interactions
FOR SELECT
USING (auth.uid() = user_id OR auth.uid() = target_user_id);

CREATE POLICY "Users can create their own interactions"
ON public.user_interactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions"
ON public.user_interactions
FOR UPDATE
USING (auth.uid() = user_id);

-- Create a table for messages between matched users
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid NOT NULL,
  receiver_id uuid NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
CREATE POLICY "Users can view messages they sent or received"
ON public.messages
FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update messages they received (mark as read)"
ON public.messages
FOR UPDATE
USING (auth.uid() = receiver_id);