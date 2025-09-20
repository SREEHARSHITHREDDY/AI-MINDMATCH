-- Add missing essential user information fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN gender TEXT,
ADD COLUMN date_of_birth DATE,
ADD COLUMN location TEXT,
ADD COLUMN occupation TEXT,
ADD COLUMN bio TEXT,
ADD COLUMN match_preferences JSONB DEFAULT '{}'::jsonb;

-- Update the existing handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public' 
AS $$
BEGIN
  -- Only create profile entry, actual data will be filled by the form
  INSERT INTO public.profiles (
    user_id, 
    name, 
    year_of_study, 
    domain_knowledge, 
    working_style, 
    personality_type, 
    communication_style, 
    decision_making, 
    tech_buzzword, 
    interests, 
    event_goal,
    gender,
    date_of_birth,
    location,
    occupation,
    bio,
    match_preferences
  )
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'name', 'User'), 
    'pending',
    'pending', 
    'pending', 
    'pending', 
    'pending', 
    'pending', 
    'pending', 
    'pending', 
    'pending',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    '{}'::jsonb
  );
  RETURN NEW;
END;
$$;