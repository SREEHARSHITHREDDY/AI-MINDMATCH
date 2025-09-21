import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Heart, Users, MessageCircle } from "lucide-react";

interface ConfirmationPageProps {
  onComplete: () => void;
}

export function ConfirmationPage({ onComplete }: ConfirmationPageProps) {
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeatures(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "AI-Powered Matching",
      description: "Get personalized matches based on your preferences and personality"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Quality Connections",
      description: "Connect with like-minded people who share your interests and values"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-500" />,
      title: "Meaningful Conversations",
      description: "Start conversations with AI-suggested icebreakers and prompts"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl glass-card border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="p-4 rounded-full bg-gradient-primary animate-pulse">
                <CheckCircle className="h-12 w-12 text-primary-foreground" />
              </div>
              <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to AI Matchmaking! 🎉
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            Your profile has been successfully created
          </p>
          
          <p className="text-lg text-muted-foreground">
            Get ready to discover amazing connections tailored just for you
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Features */}
          <div className={`space-y-6 transition-all duration-1000 ${showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-semibold text-center mb-6">What's Next?</h2>
            
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0 p-2 rounded-full bg-background">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button 
              size="lg" 
              className="w-full max-w-md bg-gradient-primary hover:opacity-90 text-primary-foreground"
              onClick={onComplete}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Discovering Matches
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Your journey to meaningful connections begins now!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-xs text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-xs text-muted-foreground">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-xs text-muted-foreground">Success Stories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}