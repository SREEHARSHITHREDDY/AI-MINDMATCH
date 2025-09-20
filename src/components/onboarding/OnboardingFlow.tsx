import { useState } from "react";
import { WelcomePage } from "./WelcomePage";
import { BasicInfoStep } from "./BasicInfoStep";
import { PurposeStep } from "./PurposeStep";
import { PersonalDetailsStep } from "./PersonalDetailsStep";
import { LifestyleStep } from "./LifestyleStep";
import { ValuesStep } from "./ValuesStep";
import { AIMatchingStep } from "./AIMatchingStep";
import { OnboardingData } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OnboardingFlowProps {
  onComplete: () => void;
}

type OnboardingStep = 'welcome' | 'basic-info' | 'purpose' | 'personal-details' | 'lifestyle' | 'values' | 'ai-matching';

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const { toast } = useToast();

  const updateData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const handleSignUp = async (basicInfo: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: basicInfo.email,
        password: basicInfo.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: basicInfo.name,
          }
        }
      });

      if (error) throw error;

      updateData(basicInfo);
      setCurrentStep('purpose');
      
      toast({
        title: "Account created!",
        description: "Let's continue setting up your profile.",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleComplete = async (finalData: any) => {
    try {
      const completeProfile = { ...onboardingData, ...finalData };
      
      // Save profile to database
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({
          name: completeProfile.name,
          gender: completeProfile.gender,
          date_of_birth: completeProfile.date_of_birth,
          bio: completeProfile.bio,
          purpose: completeProfile.purpose,
          relationship_goals: completeProfile.relationship_goals,
          hangout_activities: completeProfile.hangout_activities,
          industry_field: completeProfile.industry_field,
          lifestyle_interests: completeProfile.lifestyle_interests,
          personality_traits: completeProfile.personality_traits,
          important_values: completeProfile.important_values,
          dealbreakers: completeProfile.dealbreakers,
          skills: completeProfile.skills,
          interests: completeProfile.interests,
          hobbies: completeProfile.hobbies,
          age_range_min: completeProfile.age_range_min,
          age_range_max: completeProfile.age_range_max,
          completed_steps: ['basic-info', 'purpose', 'personal-details', 'lifestyle', 'values', 'ai-matching'],
          // Legacy fields for compatibility
          year_of_study: 'completed-onboarding',
          domain_knowledge: completeProfile.purpose,
          working_style: 'modern',
          personality_type: completeProfile.personality_traits?.[0] || 'adaptive',
          communication_style: 'effective',
          decision_making: 'collaborative',
          tech_buzzword: 'AI-powered',
          event_goal: 'meaningful-connections',
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile complete!",
        description: "Welcome to AI Matchmaking. Let's find your perfect matches!",
      });

      onComplete();
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const goBack = () => {
    switch (currentStep) {
      case 'purpose':
        setCurrentStep('basic-info');
        break;
      case 'personal-details':
        setCurrentStep('purpose');
        break;
      case 'lifestyle':
        setCurrentStep('personal-details');
        break;
      case 'values':
        setCurrentStep('lifestyle');
        break;
      case 'ai-matching':
        setCurrentStep('values');
        break;
      default:
        setCurrentStep('welcome');
        break;
    }
  };

  switch (currentStep) {
    case 'welcome':
      return <WelcomePage onGetStarted={() => setCurrentStep('basic-info')} />;
    
    case 'basic-info':
      return (
        <BasicInfoStep 
          onNext={handleSignUp}
          initialData={onboardingData}
        />
      );
    
    case 'purpose':
      return (
        <PurposeStep 
          onNext={(purpose) => {
            updateData({ purpose });
            setCurrentStep('personal-details');
          }}
          onBack={goBack}
          initialPurpose={onboardingData.purpose}
        />
      );
    
    case 'personal-details':
      return (
        <PersonalDetailsStep 
          purpose={onboardingData.purpose!}
          onNext={(data) => {
            updateData(data);
            setCurrentStep('lifestyle');
          }}
          onBack={goBack}
          initialData={onboardingData}
        />
      );
    
    case 'lifestyle':
      return (
        <LifestyleStep 
          onNext={(data) => {
            updateData(data);
            setCurrentStep('values');
          }}
          onBack={goBack}
          initialData={onboardingData}
        />
      );
    
    case 'values':
      return (
        <ValuesStep 
          onNext={(data) => {
            updateData(data);
            setCurrentStep('ai-matching');
          }}
          onBack={goBack}
          initialData={onboardingData}
        />
      );
    
    case 'ai-matching':
      return (
        <AIMatchingStep 
          onNext={handleComplete}
          onBack={goBack}
          initialData={onboardingData}
        />
      );
    
    default:
      return <WelcomePage onGetStarted={() => setCurrentStep('basic-info')} />;
  }
}