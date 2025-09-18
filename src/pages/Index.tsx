import { useState, useEffect } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { Confirmation } from "@/components/Confirmation";
import { HowItWorks } from "@/components/HowItWorks";
import { AuthForm } from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Sparkles, Calendar, Target, CheckCircle, LogOut } from "lucide-react";
import { saveProfile } from "@/lib/profileService";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-professional.jpg";
const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'confirmation' | 'how-it-works' | 'auth'>('landing');
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleFormSubmit = async (profileData: any) => {
    try {
      await saveProfile(profileData);
      setUserName(profileData.name);
      setCurrentView('confirmation');
      toast({
        title: "Profile Saved Successfully!",
        description: "You're now registered for AI matching. We'll contact you after the event with your matches.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error Saving Profile",
        description: "Please try again. If the problem persists, please contact support.",
        variant: "destructive",
      });
    }
  };
  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const handleRegisterClick = () => {
    if (user) {
      setCurrentView('form');
    } else {
      setCurrentView('auth');
    }
  };

  const handleAuthSuccess = () => {
    setCurrentView('form');
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'auth') {
    return <AuthForm onSuccess={handleAuthSuccess} onBack={handleBackToLanding} />;
  }
  if (currentView === 'form') {
    return <ProfileForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />;
  }
  if (currentView === 'confirmation') {
    return <Confirmation userName={userName} onBack={handleBackToLanding} />;
  }
  if (currentView === 'how-it-works') {
    return <HowItWorks onBack={handleBackToLanding} />;
  }
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="relative container mx-auto px-6 py-20">
          {user && (
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          )}
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
                <Button variant="glass" size="lg" onClick={handleRegisterClick} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {user ? 'Register Now' : 'Sign In to Register'}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setCurrentView('how-it-works')} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Brain className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative gentle-float">
              <img src={heroImage} alt="Professional AI Matchmaking" className="w-full max-w-lg mx-auto rounded-2xl shadow-glass" />
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

            <Card className="group text-center glass-card border-0 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 bg-card/80 backdrop-blur-sm" style={{
            animationDelay: '0.1s'
          }}>
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

            <Card className="group text-center glass-card border-0 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 bg-card/80 backdrop-blur-sm" style={{
            animationDelay: '0.2s'
          }}>
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
            <Button variant="glass" size="lg" onClick={handleRegisterClick} className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-button">
              <Users className="mr-2 h-5 w-5" />
              {user ? 'Register Your Profile' : 'Sign In to Register'}
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;