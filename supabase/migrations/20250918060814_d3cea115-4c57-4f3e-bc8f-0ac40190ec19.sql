-- Add comprehensive RLS policies for matches table

-- Only allow INSERT from service role (system-generated matches)
CREATE POLICY "Only system can create matches" 
ON public.matches 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- Allow users to update their own matches (e.g., mark as viewed)
CREATE POLICY "Users can update their own matches" 
ON public.matches 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow users to delete their own matches
CREATE POLICY "Users can delete their own matches" 
ON public.matches 
FOR DELETE 
USING (auth.uid() = user_id);