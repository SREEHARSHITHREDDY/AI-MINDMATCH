import { useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { Confirmation } from "@/components/Confirmation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Sparkles, Calendar, Target, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-professional.jpg";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'confirmation'>('landing');
  const [userName, setUserName] = useState('');

  const handleFormSubmit = (profileData: any) => {
    setUserName(profileData.name);
    // Here you would typically save to database
    console.log('Profile submitted:', profileData);
    setCurrentView('confirmation');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  if (currentView === 'form') {
    return <ProfileForm onSubmit={handleFormSubmit} />;
  }

  if (currentView === 'confirmation') {
    return (
      <Confirmation 
        userName={userName}
        onBack={handleBackToLanding}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                AI Matchmaking
                <span className="block text-white/90">
                  Professional Networking
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl">
                Submit your profile now and receive your perfectly matched connections after the event. 
                Our AI analyzes all participants to create the most meaningful professional relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="glass" 
                  size="lg" 
                  onClick={() => setCurrentView('form')}
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Register Now
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Brain className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative gentle-float">
              <img 
                src={heroImage} 
                alt="Professional AI Matchmaking" 
                className="w-full max-w-lg mx-auto rounded-2xl shadow-glass"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              How Our Process Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Register now, get matched later. Our systematic approach ensures the highest quality connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center glass-card border-0 hover:shadow-card transition-all duration-300 gentle-float">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">1. Register Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Complete our comprehensive profile form with your skills, interests, and professional goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center glass-card border-0 hover:shadow-card transition-all duration-300 gentle-float">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">2. AI Analysis Period</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  After registration closes, our AI processes all profiles to identify optimal matches and compatibility.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center glass-card border-0 hover:shadow-card transition-all duration-300 gentle-float">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">3. Receive Your Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get your personalized compatibility report with detailed match explanations after the event.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Our AI Matching Works</h2>
            <p className="text-xl text-muted-foreground">
              Professional networking powered by advanced compatibility algorithms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card border-0 p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Skill Complementarity</h3>
                  <p className="text-muted-foreground text-sm">
                    Matches based on complementary skills to create well-balanced collaborative opportunities.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card border-0 p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Interest Similarity</h3>
                  <p className="text-muted-foreground text-sm">
                    Connects people with shared passions and professional interests for meaningful conversations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-card border-0 p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Goal Alignment</h3>
                  <p className="text-muted-foreground text-sm">
                    Ensures matched participants have compatible objectives for the networking experience.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <div className="glass-card max-w-3xl mx-auto p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Network?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Register your profile today and receive your personalized professional matches after the event. 
              Don't miss this opportunity to expand your network with AI-powered precision.
            </p>
            <Button 
              variant="glass" 
              size="lg" 
              onClick={() => setCurrentView('form')}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-button"
            >
              <Users className="mr-2 h-5 w-5" />
              Register Your Profile
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
