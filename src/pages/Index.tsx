import { useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { Confirmation } from "@/components/Confirmation";
import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Sparkles, Calendar, Target, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-professional.jpg";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'confirmation' | 'how-it-works'>('landing');
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
    return <ProfileForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />;
  }

  if (currentView === 'confirmation') {
    return (
      <Confirmation 
        userName={userName}
        onBack={handleBackToLanding}
      />
    );
  }

  if (currentView === 'how-it-works') {
    return <HowItWorks onBack={handleBackToLanding} />;
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
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setCurrentView('how-it-works')}
                >
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
            <Card className="group text-center glass-card border-0 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Users className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="w-12 h-1 bg-gradient-primary rounded-full mx-auto mb-4 group-hover:w-16 transition-all duration-300"></div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">1. Register Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Complete our comprehensive profile form with your skills, interests, and professional goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group text-center glass-card border-0 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 bg-card/80 backdrop-blur-sm" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <Calendar className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="w-12 h-1 bg-gradient-primary rounded-full mx-auto mb-4 group-hover:w-16 transition-all duration-300"></div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">2. AI Analysis Period</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  After registration closes, our AI processes all profiles to identify optimal matches and compatibility.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group text-center glass-card border-0 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 bg-card/80 backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <CheckCircle className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="w-12 h-1 bg-gradient-primary rounded-full mx-auto mb-4 group-hover:w-16 transition-all duration-300"></div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">3. Receive Your Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground group-hover:text-foreground transition-colors duration-300">
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
            <Card className="group glass-card border-0 p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-3 text-foreground group-hover:text-primary transition-colors duration-300">Skill Complementarity</h3>
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                    Matches based on complementary skills to create well-balanced collaborative opportunities.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="group glass-card border-0 p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-3 text-foreground group-hover:text-primary transition-colors duration-300">Interest Similarity</h3>
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                    Connects people with shared passions and professional interests for meaningful conversations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="group glass-card border-0 p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-3 text-foreground group-hover:text-primary transition-colors duration-300">Goal Alignment</h3>
                  <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
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
