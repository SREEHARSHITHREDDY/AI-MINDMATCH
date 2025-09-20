import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Briefcase, Sparkles, ArrowLeft } from "lucide-react";

interface PurposeStepProps {
  onNext: (purpose: 'relationship' | 'friendship' | 'professional' | 'explore') => void;
  onBack: () => void;
  initialPurpose?: string;
}

export function PurposeStep({ onNext, onBack, initialPurpose }: PurposeStepProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<string>(initialPurpose || "");

  const purposes = [
    {
      id: 'relationship',
      title: 'Open for Relationship',
      description: 'Looking for romantic connections and meaningful relationships',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 hover:bg-red-100',
      borderColor: 'border-red-200',
    },
    {
      id: 'friendship',
      title: 'Friendship / Social Networking',
      description: 'Building friendships and expanding social circles',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-200',
    },
    {
      id: 'professional',
      title: 'Professional Networking',
      description: 'Growing professional connections and career opportunities',
      icon: Briefcase,
      color: 'text-green-500',
      bgColor: 'bg-green-50 hover:bg-green-100',
      borderColor: 'border-green-200',
    },
    {
      id: 'explore',
      title: 'Not Sure / Explore All',
      description: 'Open to all types of connections and experiences',
      icon: Sparkles,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      borderColor: 'border-purple-200',
    },
  ];

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
          <h1 className="text-4xl font-bold mb-4">What kind of connections are you looking for?</h1>
          <p className="text-xl text-muted-foreground">
            This helps us tailor the matching experience to your goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {purposes.map((purpose) => {
            const Icon = purpose.icon;
            const isSelected = selectedPurpose === purpose.id;
            
            return (
              <Card
                key={purpose.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-lg scale-105' 
                    : 'hover:scale-102'
                }`}
                onClick={() => setSelectedPurpose(purpose.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    isSelected ? 'bg-primary' : purpose.bgColor
                  }`}>
                    <Icon className={`h-8 w-8 ${
                      isSelected ? 'text-primary-foreground' : purpose.color
                    }`} />
                  </div>
                  <CardTitle className="text-xl">{purpose.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {purpose.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => onNext(selectedPurpose as any)}
            disabled={!selectedPurpose}
            className="px-8"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}