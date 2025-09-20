import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, X } from "lucide-react";

interface ValuesData {
  important_values: string[];
  dealbreakers: string[];
}

interface ValuesStepProps {
  onNext: (data: ValuesData) => void;
  onBack: () => void;
  initialData?: Partial<ValuesData>;
}

export function ValuesStep({ onNext, onBack, initialData }: ValuesStepProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(initialData?.important_values || []);
  const [selectedDealbreakers, setSelectedDealbreakers] = useState<string[]>(initialData?.dealbreakers || []);

  const importantValues = [
    "Family", "Career", "Health & Fitness", "Travel", "Spirituality",
    "Education", "Creativity", "Adventure", "Stability", "Financial Security",
    "Personal Growth", "Social Impact", "Environmental Consciousness",
    "Innovation", "Tradition", "Independence", "Community", "Authenticity"
  ];

  const dealbreakers = [
    "Smoking", "Heavy Drinking", "Drug Use", "Dishonesty", "Lack of Ambition",
    "Poor Hygiene", "Rudeness", "Infidelity", "Aggressive Behavior",
    "Different Life Goals", "No Sense of Humor", "Extreme Political Views",
    "Financial Irresponsibility", "Lack of Communication", "Disrespect",
    "Different Family Values", "Unhealthy Lifestyle", "Closed-mindedness"
  ];

  const toggleValue = (value: string) => {
    setSelectedValues(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const toggleDealbreaker = (dealbreaker: string) => {
    setSelectedDealbreakers(prev => 
      prev.includes(dealbreaker) 
        ? prev.filter(d => d !== dealbreaker)
        : [...prev, dealbreaker]
    );
  };

  const handleSubmit = () => {
    onNext({
      important_values: selectedValues,
      dealbreakers: selectedDealbreakers,
    });
  };

  const isValid = selectedValues.length >= 3 && selectedDealbreakers.length >= 2;

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
          <h1 className="text-4xl font-bold mb-4">Values & Dealbreakers</h1>
          <p className="text-xl text-muted-foreground">
            What matters most to you in a connection?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Important Values */}
          <Card className="glass-card border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <CardTitle className="text-green-700">Important Values</CardTitle>
              </div>
              <CardDescription>
                Select at least 3 values that are important to you ({selectedValues.length} selected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {importantValues.map((value) => (
                  <Badge
                    key={value}
                    variant={selectedValues.includes(value) ? "default" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform bg-green-100 text-green-800 hover:bg-green-200"
                    onClick={() => toggleValue(value)}
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dealbreakers */}
          <Card className="glass-card border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <X className="h-5 w-5 text-red-500" />
                <CardTitle className="text-red-700">Dealbreakers</CardTitle>
              </div>
              <CardDescription>
                Select at least 2 dealbreakers you want to avoid ({selectedDealbreakers.length} selected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {dealbreakers.map((dealbreaker) => (
                  <Badge
                    key={dealbreaker}
                    variant={selectedDealbreakers.includes(dealbreaker) ? "destructive" : "outline"}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => toggleDealbreaker(dealbreaker)}
                  >
                    {dealbreaker}
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
              Please select at least 3 values and 2 dealbreakers
            </p>
          )}
        </div>
      </div>
    </div>
  );
}