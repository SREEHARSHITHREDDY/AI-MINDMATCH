import { useState, useEffect } from "react";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { MatchingApp } from "./MatchingApp";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserProfile(session.user.id);
      } else {
        setUserProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      setUserProfile(profile);
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking profile:', error);
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    // Refresh user profile after onboarding
    if (user) {
      checkUserProfile(user.id);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in and has completed profile, show the matching app
  if (user && userProfile && userProfile.completed_steps?.includes('ai-matching')) {
    return <MatchingApp onSignOut={handleSignOut} />;
  }

  // If user is logged in but hasn't completed onboarding, show onboarding flow
  if (user && (!userProfile || !userProfile.completed_steps?.includes('ai-matching'))) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // If user is not logged in, show onboarding flow (which includes sign up)
  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
};
export default Index;