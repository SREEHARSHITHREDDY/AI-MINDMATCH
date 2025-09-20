import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Brain, Target } from "lucide-react";

interface AIMatchingData {
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

interface AIMatchingStepProps {
  onNext: (data: AIMatchingData) => void;
  onBack: () => void;
  initialData?: Partial<AIMatchingData>;
}

export function AIMatchingStep({ onNext, onBack, initialData }: AIMatchingStepProps) {
  const [formData, setFormData] = useState<AIMatchingData>({
    skills: initialData?.skills || {
      AI: 3,
      Finance: 3,
      Design: 3,
      Marketing: 3,
      Programming: 3,
    },
    interests: initialData?.interests || "",
    hobbies: initialData?.hobbies || "",
    age_range_min: initialData?.age_range_min || 18,
    age_range_max: initialData?.age_range_max || 65,
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
    onNext(formData);
  };

  const isValid = formData.interests.trim() && formData.hobbies.trim();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="glass-card border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-primary">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">AI Matching Profile</CardTitle>
            <CardDescription>
              Help our AI understand your skills and preferences for better matching
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Skills Assessment */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-primary" />
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

              {/* Interests & Hobbies */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="interests">Professional/Academic Interests</Label>
                  <Textarea
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                    placeholder="Describe your professional interests and what you're passionate about..."
                    className="min-h-24"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hobbies">Hobbies & Personal Interests</Label>
                  <Textarea
                    id="hobbies"
                    value={formData.hobbies}
                    onChange={(e) => setFormData(prev => ({ ...prev, hobbies: e.target.value }))}
                    placeholder="Tell us about your hobbies and what you do for fun..."
                    className="min-h-24"
                    required
                  />
                </div>
              </div>

              {/* Age Range Preferences */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Age Range Preferences</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Minimum Age</Label>
                    <Input
                      type="number"
                      min="18"
                      max="100"
                      value={formData.age_range_min}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        age_range_min: parseInt(e.target.value) || 18 
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Maximum Age</Label>
                    <Input
                      type="number"
                      min="18"
                      max="100"
                      value={formData.age_range_max}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        age_range_max: parseInt(e.target.value) || 65 
                      }))}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!isValid}
                size="lg"
              >
                Complete Profile Setup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}