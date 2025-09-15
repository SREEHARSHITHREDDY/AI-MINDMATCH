import { useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import { MatchResults } from "@/components/MatchResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Sparkles, Zap, Target } from "lucide-react";
import heroImage from "@/assets/hero-matchmaking.jpg";

// Mock AI matching algorithm
const calculateMatches = (userData: any) => {
  // Simulate AI processing delay
  const mockMatches = [
    {
      id: "1",
      name: "Alex Chen",
      yearOfStudy: "3rd Year",
      domainKnowledge: "Technology",
      workingStyle: "Team Player",
      personalityType: "Ambivert",
      eventGoal: "Collaboration",
      techBuzzword: "AI",
      interests: ["Data Science", "Gaming", "Startups"],
      matchScore: 92,
      compatibilityReasons: [
        "Shared passion for AI and technology",
        "Both prefer collaborative work environments",
        "Complementary skills in programming and design",
        "Similar learning goals for the event"
      ],
      complementarySkills: [
        "Strong in Finance while you excel in Design",
        "Marketing expertise complements your AI skills",
        "Leadership qualities balance your creative thinking"
      ]
    },
    {
      id: "2", 
      name: "Sarah Kim",
      yearOfStudy: "Final Year",
      domainKnowledge: "Business",
      workingStyle: "Leader",
      personalityType: "Extrovert", 
      eventGoal: "Networking",
      techBuzzword: "Blockchain",
      interests: ["Startups", "Art", "Music"],
      matchScore: 78,
      compatibilityReasons: [
        "Complementary business and tech backgrounds",
        "Both interested in startup ecosystem",
        "Balance between leadership and creativity"
      ],
      complementarySkills: [
        "Business strategy expertise",
        "Strong networking abilities",
        "Marketing and communication skills"
      ]
    },
    {
      id: "3",
      name: "David Rodriguez", 
      yearOfStudy: "2nd Year",
      domainKnowledge: "Analytics",
      workingStyle: "Creative Thinker",
      personalityType: "Introvert",
      eventGoal: "Learning",
      techBuzzword: "Quantum",
      interests: ["Data Science", "Reading", "Photography"],
      matchScore: 65,
      compatibilityReasons: [
        "Shared analytical mindset",
        "Both value learning and growth",
        "Complementary introvert-extrovert balance"
      ],
      complementarySkills: [
        "Advanced data analysis skills",
        "Research and documentation abilities", 
        "Attention to detail and precision"
      ]
    }
  ];

  return mockMatches;
};

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'form' | 'results'>('landing');
  const [matches, setMatches] = useState<any[]>([]);
  const [userName, setUserName] = useState('');

  const handleFormSubmit = (profileData: any) => {
    setUserName(profileData.name);
    const calculatedMatches = calculateMatches(profileData);
    setMatches(calculatedMatches);
    setCurrentView('results');
  };

  const handleBackToProfile = () => {
    setCurrentView('form');
  };

  if (currentView === 'form') {
    return <ProfileForm onSubmit={handleFormSubmit} />;
  }

  if (currentView === 'results') {
    return (
      <MatchResults 
        matches={matches} 
        userName={userName}
        onBack={handleBackToProfile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero gradient-animate"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                AI Matchmaking
                <span className="block text-primary-glow">
                  Find Your Perfect Match
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Let artificial intelligence analyze your skills, interests, and personality to connect you with the most compatible participants for collaboration and networking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => setCurrentView('form')}
                  className="shadow-glow"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Matching
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Brain className="mr-2 h-5 w-5" />
                  How It Works
                </Button>
              </div>
            </div>
            <div className="relative float-animation">
              <img 
                src={heroImage} 
                alt="AI Matchmaking Illustration" 
                className="w-full max-w-lg mx-auto rounded-2xl shadow-glow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              How AI Matchmaking Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced algorithm analyzes multiple factors to create the perfect matches based on compatibility, skills, and shared interests.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Skill Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  AI evaluates your skills and finds complementary matches to create balanced, high-performing teams.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-xl">Personality Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Advanced personality analysis ensures compatible communication styles and working preferences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Goal Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Matches participants with similar objectives for networking, collaboration, fun, or learning.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Match Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Match Quality Levels</h2>
            <p className="text-xl text-muted-foreground">
              Our AI assigns compatibility scores to help you understand your match potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-perfect-match/10 to-perfect-match/5 border-perfect-match/20">
              <CardHeader>
                <div className="text-4xl mb-2">🔥</div>
                <CardTitle className="text-perfect-match">Perfect Match</CardTitle>
                <CardDescription>80-100% Compatibility</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Exceptional compatibility across all factors
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-good-match/10 to-good-match/5 border-good-match/20">
              <CardHeader>
                <div className="text-4xl mb-2">😊</div>
                <CardTitle className="text-good-match">Good Match</CardTitle>
                <CardDescription>60-79% Compatibility</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Strong potential for collaboration
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-moderate-match/10 to-moderate-match/5 border-moderate-match/20">
              <CardHeader>
                <div className="text-4xl mb-2">🙂</div>
                <CardTitle className="text-moderate-match">Moderate Match</CardTitle>
                <CardDescription>40-59% Compatibility</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Some shared interests and goals
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-unlikely-match/10 to-unlikely-match/5 border-unlikely-match/20">
              <CardHeader>
                <div className="text-4xl mb-2">😅</div>
                <CardTitle className="text-unlikely-match">Unlikely Match</CardTitle>
                <CardDescription>Below 40% Compatibility</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Different approaches but could be interesting
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero gradient-animate">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our AI-powered matchmaking experience and discover meaningful connections based on compatibility and shared interests.
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => setCurrentView('form')}
            className="shadow-glow bg-white text-primary hover:bg-white/90"
          >
            <Users className="mr-2 h-5 w-5" />
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
