-- Add missing fields to profiles table to match the OnboardingData structure
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS purpose text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS relationship_goals text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hangout_activities text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS industry_field text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS lifestyle_interests text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS personality_traits text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS important_values text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS dealbreakers text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS skills text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS interests text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hobbies text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS age_range_min integer;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS age_range_max integer;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS completed_steps text[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS date_of_birth date;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_picture_url text;