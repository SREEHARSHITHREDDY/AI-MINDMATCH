import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { User, Brain, Target, Heart, Sparkles, ArrowLeft } from "lucide-react";

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
}

interface ProfileFormProps {
  onSubmit: (data: ProfileData) => void;
  onBack: () => void;
}

export function ProfileForm({ onSubmit, onBack }: ProfileFormProps) {
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
    skills: {
      AI: 3,
      Finance: 3,
      Design: 3,
      Marketing: 3,
      Programming: 3,
    },
    interests: "",
    eventGoal: "",
    additionalInfo: "",
  });

  const handleSkillChange = (skill: keyof typeof formData.skills, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: value[0]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="glass" 
            onClick={onBack}
            className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Professional Profile Registration
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Help us understand your professional background to create meaningful connections
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-6 -mt-8 relative z-10">
        <Card className="glass-card border-0 slide-up bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary gentle-float">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Create Your Profile
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Tell us about yourself to find your perfect match!
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Basic Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearOfStudy">Year of Study / Experience</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, yearOfStudy: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain Knowledge Area</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, domainKnowledge: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="creativity">Creativity</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workingStyle">Working Style</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, workingStyle: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individualist">Individualist</SelectItem>
                      <SelectItem value="team-player">Team Player</SelectItem>
                      <SelectItem value="leader">Leader</SelectItem>
                      <SelectItem value="creative-thinker">Creative Thinker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Skills Assessment */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Skills Assessment</h3>
              </div>
              
              {Object.entries(formData.skills).map(([skill, value]) => (
                <div key={skill} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">{skill}</Label>
                    <span className="text-sm font-medium text-primary">{value}/5</span>
                  </div>
                  <Slider
                    value={[value]}
                    onValueChange={(val) => handleSkillChange(skill as keyof typeof formData.skills, val)}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            {/* Personality & Preferences */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Personality & Preferences</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Personality Type</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, personalityType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="introvert">Introvert</SelectItem>
                      <SelectItem value="extrovert">Extrovert</SelectItem>
                      <SelectItem value="ambivert">Ambivert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Communication Style</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, communicationStyle: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visual">Visual</SelectItem>
                      <SelectItem value="verbal">Verbal</SelectItem>
                      <SelectItem value="analytical">Analytical</SelectItem>
                      <SelectItem value="storytelling">Storytelling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Decision Making</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, decisionMaking: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select approach" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="data-driven">Data-driven</SelectItem>
                      <SelectItem value="intuitive">Intuitive</SelectItem>
                      <SelectItem value="collaborative">Collaborative</SelectItem>
                      <SelectItem value="risk-taking">Risk-taking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Interests & Goals */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Interests & Goals</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="techBuzzword">Favorite Tech Buzzword</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, techBuzzword: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select buzzword" />
                    </SelectTrigger>
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
                
                <div className="space-y-2">
                  <Label htmlFor="eventGoal">Goal for Event</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, eventGoal: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="fun">Fun</SelectItem>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="learning">Learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interests">Interests & Hobbies</Label>
                <Textarea
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                  placeholder="e.g., Startups, Gaming, Art, Data Science, Music, Sports..."
                  className="min-h-20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hobbies">Additional Hobbies</Label>
                <Input
                  id="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => setFormData(prev => ({ ...prev, hobbies: e.target.value }))}
                  placeholder="e.g., Photography, Cooking, Travel, Reading..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  placeholder="Anything else you'd like potential matches to know..."
                  className="min-h-20"
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button type="submit" variant="professional" size="lg" className="min-w-48">
                <Sparkles className="mr-2 h-5 w-5" />
                Submit Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}