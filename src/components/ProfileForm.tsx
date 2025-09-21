import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Ensure you have this configured
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { User, Brain, Heart, Target, Sparkles, ArrowLeft } from "lucide-react";

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
  gender: string;
  dateOfBirth: string;
  location: string;
  occupation: string;
  bio: string;
  matchPreferences: {
    genderPreference: string;
    ageRangeMin: number;
    ageRangeMax: number;
    locationRange: string;
  };
}

interface ProfileFormProps {
  onBack: () => void;
}

export default function ProfileForm({ onBack }: ProfileFormProps) {
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

  const handleSkillChange = (skill: keyof typeof formData.skills, value: number[]) => {
    setFormData(prev => ({ ...prev, skills: { ...prev.skills, [skill]: value[0] } }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error("User not authenticated");

      const payload = {
        user_id: user.id,
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
      };

      const { data, error } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: ["user_id"] });

      if (error) throw error;

      alert("Profile saved successfully!");
    } catch (err: any) {
      console.error("Error saving profile:", err.message);
      alert("Error saving profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <Button variant="glass" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your Profile</CardTitle>
            <CardDescription>Fill out your info to find meaningful matches</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Basic Info */}
              <div>
                <Label>Name</Label>
                <Input value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
              </div>

              <div>
                <Label>Year of Study / Experience</Label>
                <Select onValueChange={value => setFormData(prev => ({ ...prev, yearOfStudy: value }))}>
                  <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st-year">1st Year</SelectItem>
                    <SelectItem value="2nd-year">2nd Year</SelectItem>
                    <SelectItem value="3rd-year">3rd Year</SelectItem>
                    <SelectItem value="final-year">Final Year</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Date of Birth</Label>
                  <Input type="date" value={formData.dateOfBirth} onChange={e => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))} required />
                </div>

                <div>
                  <Label>Gender</Label>
                  <Select onValueChange={value => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Location</Label>
                <Input value={formData.location} onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))} required />
              </div>

              <div>
                <Label>Occupation / Field</Label>
                <Input value={formData.occupation} onChange={e => setFormData(prev => ({ ...prev, occupation: e.target.value }))} required />
              </div>

              <div>
                <Label>Bio</Label>
                <Textarea value={formData.bio} onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))} required />
              </div>

              {/* Skills */}
              <div>
                <Label>Skills (1-5)</Label>
                {Object.entries(formData.skills).map(([skill, value]) => (
                  <div key={skill} className="flex items-center gap-2">
                    <span className="w-32">{skill}</span>
                    <Slider value={[value]} max={5} min={1} step={1} onValueChange={val => handleSkillChange(skill as keyof typeof formData.skills, val)} />
                    <span>{value}/5</span>
                  </div>
                ))}
              </div>

              {/* Personality */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Personality Type</Label>
                  <Select onValueChange={v => setFormData(prev => ({ ...prev, personalityType: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="introvert">Introvert</SelectItem>
                      <SelectItem value="extrovert">Extrovert</SelectItem>
                      <SelectItem value="ambivert">Ambivert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Communication Style</Label>
                  <Select onValueChange={v => setFormData(prev => ({ ...prev, communicationStyle: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visual">Visual</SelectItem>
                      <SelectItem value="verbal">Verbal</SelectItem>
                      <SelectItem value="analytical">Analytical</SelectItem>
                      <SelectItem value="storytelling">Storytelling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Decision Making</Label>
                  <Select onValueChange={v => setFormData(prev => ({ ...prev, decisionMaking: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="data-driven">Data-driven</SelectItem>
                      <SelectItem value="intuitive">Intuitive</SelectItem>
                      <SelectItem value="collaborative">Collaborative</SelectItem>
                      <SelectItem value="risk-taking">Risk-taking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Interests & Event Goals */}
              <div>
                <Label>Interests</Label>
                <Textarea value={formData.interests} onChange={e => setFormData(prev => ({ ...prev, interests: e.target.value }))} />
              </div>

              <div>
                <Label>Favorite Tech Buzzword</Label>
                <Select onValueChange={v => setFormData(prev => ({ ...prev, techBuzzword: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                    <SelectItem value="Metaverse">Metaverse</SelectItem>
                    <SelectItem value="IoT">IoT</SelectItem>
                    <SelectItem value="Quantum">Quantum</SelectItem>
                    <SelectItem value="Cloud">Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Goal for Event</Label>
                <Select onValueChange={v => setFormData(prev => ({ ...prev, eventGoal: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="fun">Fun</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Additional Hobbies</Label>
                <Input value={formData.hobbies} onChange={e => setFormData(prev => ({ ...prev, hobbies: e.target.value }))} />
              </div>

              <div>
                <Label>Additional Info</Label>
                <Textarea value={formData.additionalInfo} onChange={e => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))} />
              </div>

              {/* Matching Preferences */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Gender for Matches</Label>
                  <Select onValueChange={v => setFormData(prev => ({ ...prev, matchPreferences: { ...prev.matchPreferences, genderPreference: v } }))}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Preferred Age Range</Label>
                  <div className="flex gap-2">
                    <Input type="number" value={formData.matchPreferences.ageRangeMin} onChange={e => setFormData(prev => ({ ...prev, matchPreferences: { ...prev.matchPreferences, ageRangeMin: parseInt(e.target.value) } }))} placeholder="Min" />
                    <Input type="number" value={formData.matchPreferences.ageRangeMax} onChange={e => setFormData(prev => ({ ...prev, matchPreferences: { ...prev.matchPreferences, ageRangeMax: parseInt(e.target.value) } }))} placeholder="Max" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label>Preferred Location for Matches</Label>
                  <Input value={formData.matchPreferences.locationRange} onChange={e => setFormData(prev => ({ ...prev, matchPreferences: { ...prev.matchPreferences, locationRange: e.target.value } }))} />
                </div>
              </div>

              <div className="flex justify-center">
                <Button type="submit" variant="professional">
                  <Sparkles className="mr-2 h-5 w-5" /> Save Profile
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
