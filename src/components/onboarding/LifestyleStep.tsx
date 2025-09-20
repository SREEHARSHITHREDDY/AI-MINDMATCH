import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Zap } from "lucide-react";

interface LifestyleData {
  lifestyle_interests: string[];
  personality_traits: string[];
}

interface LifestyleStepProps {
  onNext: (data: LifestyleData) => void;
  onBack: () => void;
  initialData?: Partial<LifestyleData>;
}

export function LifestyleStep({ onNext, onBack, initialData }: LifestyleStepProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialData?.lifestyle_interests || []);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(initialData?.personality_traits || []);

  const lifestyleInterests = [
    "Sports & Fitness", "Reading", "Travel", "Music", "Movies & TV", "Cooking",
    "Photography", "Art & Design", "Gaming", "Dancing", "Outdoor Activities",
    "Technology", "Fashion", "Food & Dining", "Pets", "Volunteering",
    "Learning Languages", "Meditation", "Writing", "Crafts & DIY"
  ];

  const personalityTraits = [
    "Fun-loving", "Serious", "Adventurous", "Introverted", "Extroverted",
    "Creative", "Analytical", "Spontaneous", "Organized", "Calm",
    "Energetic", "Ambitious", "Laid-back", "Optimistic", "Thoughtful",
    "Humorous", "Independent", "Team-oriented", "Detail-oriented", "Big-picture thinker"
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => 
      prev.includes(trait) 
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    );
  };

  const handleSubmit = () => {
    onNext({
      lifestyle_interests: selectedInterests,
      personality_traits: selectedTraits,
    });
  };

  const isValid = selectedInterests.length >= 3 && selectedTraits.length >= 3;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Lifestyle & Interests</h1>
          <p className="text-xl text-muted-foreground">
            Help us understand your interests and personality
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Hobbies & Activities */}
          <Card className="glass-card border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <CardTitle>Hobbies & Activities</CardTitle>
              </div>
              <CardDescription>
                Select at least 3 interests ({selectedInterests.length} selected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lifestyleInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personality Traits */}
          <Card className="glass-card border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>Personality Traits</CardTitle>
              </div>
              <CardDescription>
                Select at least 3 traits that describe you ({selectedTraits.length} selected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {personalityTraits.map((trait) => (
                  <Badge
                    key={trait}
                    variant={selectedTraits.includes(trait) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleTrait(trait)}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleSubmit}
            disabled={!isValid}
            className="px-8"
          >
            Continue
          </Button>
          {!isValid && (
            <p className="text-sm text-muted-foreground mt-2">
              Please select at least 3 interests and 3 personality traits
            </p>
          )}
        </div>
      </div>
    </div>
  );
}