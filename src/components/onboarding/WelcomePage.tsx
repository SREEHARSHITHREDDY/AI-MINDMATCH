import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Briefcase, Sparkles } from "lucide-react";

interface WelcomePageProps {
  onGetStarted: () => void;
}

export function WelcomePage({ onGetStarted }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 gentle-float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            AI Matchmaking
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover meaningful connections through intelligent matching. Whether you're looking for 
            love, friendship, or professional networking, our AI finds your perfect match.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card border-0 bg-white/10 text-white">
            <CardHeader className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <CardTitle className="text-lg">Relationships</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Find meaningful romantic connections
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 bg-white/10 text-white">
            <CardHeader className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <CardTitle className="text-lg">Friendship</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Build lasting friendships and social connections
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 bg-white/10 text-white">
            <CardHeader className="text-center">
              <Briefcase className="w-8 h-8 mx-auto mb-2" />
              <CardTitle className="text-lg">Professional</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Expand your professional network
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 bg-white/10 text-white">
            <CardHeader className="text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <CardTitle className="text-lg">Explore All</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                Open to all types of connections
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-button"
          >
            Get Started
          </Button>
          <p className="text-white/80 text-sm">
            Join thousands finding their perfect matches
          </p>
        </div>
      </div>
    </div>
  );
}