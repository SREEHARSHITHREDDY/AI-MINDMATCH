// src/components/ProfileForm.tsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Sparkles } from "lucide-react";

interface Skills {
  AI: number;
  Finance: number;
  Design: number;
  Marketing: number;
  Programming: number;
}

interface MatchPreferences {
  genderPreference: string;
  ageRangeMin: number;
  ageRangeMax: number;
  locationRange: string;
}

interface ProfileData {
  name: string;
  yearOfStudy: string;
  domainKnowledge: string;
  workingStyle: string;
  personalityType: string;
  communicationStyle: string;
  decisionMaking: string;
  techBuzzword: string;
  hobbies: string;
  skills: Skills;
  interests: string;
  eventGoal: string;
  additionalInfo: string;
  gender: string;
  dateOfBirth: string;
  location: string;
  occupation: string;
  bio: string;
  matchPreferences: MatchPreferences;
}

interface ProfileFormProps {
  onBack: () => void;
}

export function ProfileForm({ onBack }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    yearOfStudy: "",
    domainKnowledge: "",
    workingStyle: "",
    personalityType: "",
    communicationStyle: "",
    decisionMaking: "",
    techBuzzword: "",
    hobbies: "",
    skills: { AI: 3, Finance: 3, Design: 3, Marketing: 3, Programming: 3 },
    interests: "",
    eventGoal: "",
    additionalInfo: "",
    gender: "",
    dateOfBirth: "",
    location: "",
    occupation: "",
    bio: "",
    matchPreferences: { genderPreference: "", ageRangeMin: 18, ageRangeMax: 65, locationRange: "" },
  });

  const handleSkillChange = (skill: keyof Skills, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      skills: { ...prev.skills, [skill]: value[0] },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        name: formData.name,
        year_of_study: formData.yearOfStudy,
        domain_knowledge: formData.domainKnowledge,
        working_style: formData.workingStyle,
        personality_type: formData.personalityType,
        communication_style: formData.communicationStyle,
        decision_making: formData.decisionMaking,
        tech_buzzword: formData.techBuzzword,
        hobbies: formData.hobbies,
        skills_ai: formData.skills.AI,
        skills_finance: formData.skills.Finance,
        skills_design: formData.skills.Design,
        skills_marketing: formData.skills.Marketing,
        skills_programming: formData.skills.Programming,
        interests: formData.interests,
        event_goal: formData.eventGoal,
        additional_info: formData.additionalInfo,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        location: formData.location,
        occupation: formData.occupation,
        bio: formData.bio,
        match_preferences_gender: formData.matchPreferences.genderPreference,
        match_preferences_age_min: formData.matchPreferences.ageRangeMin,
        match_preferences_age_max: formData.matchPreferences.ageRangeMax,
        match_preferences_location: formData.matchPreferences.locationRange,
      })
      .select();

    if (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } else {
      alert("Profile saved successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <Button variant="glass" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="p-6 glass-card">
          <CardHeader className="text-center pb-8">
            <CardTitle>Create Your Profile</CardTitle>
            <CardDescription>Fill in your professional details</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={e => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  required
                />
              </div>

              {/* Skills sliders */}
              {Object.entries(formData.skills).map(([skill, value]) => (
                <div key={skill} className="space-y-1">
                  <Label>{skill}</Label>
                  <Slider
                    value={[value]}
                    onValueChange={(val) => handleSkillChange(skill as keyof Skills, val)}
                    min={1}
                    max={5}
                    step={1}
                  />
                </div>
              ))}

              <Button type="submit" variant="professional">
                <Sparkles className="mr-2 h-5 w-5" /> Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
