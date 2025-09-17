import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Brain, Calendar, Target, CheckCircle, Network } from "lucide-react";

interface HowItWorksProps {
  onBack: () => void;
}

export const HowItWorks = ({ onBack }: HowItWorksProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="glass" 
            onClick={onBack}
            className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              How Our AI Matchmaking Works
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Understanding our comprehensive process for creating meaningful professional connections
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Process Steps */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Science Behind the Matches</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our AI-powered system analyzes multiple dimensions of professional compatibility to ensure 
                every connection has the potential for meaningful collaboration and mutual growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Multi-dimensional compatibility analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Real-time processing of all participant data</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Personalized match explanations</span>
                </div>
              </div>
            </div>
            <div className="glass-card p-8 bg-card/50 border border-border/50">
              <Network className="h-16 w-16 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-center mb-4 text-foreground">Network Effect</h3>
              <p className="text-muted-foreground text-center">
                Each new participant enhances the quality of matches for everyone in the network, 
                creating exponentially better connections as our community grows.
              </p>
            </div>
          </div>

          {/* Step by Step Process */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Step-by-Step Process</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border border-border/50 bg-card/50">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-foreground">Profile Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    Complete comprehensive profiling including skills, interests, goals, and networking preferences.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass-card border border-border/50 bg-card/50">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-foreground">AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    Advanced algorithms process all profiles to identify optimal compatibility patterns and connections.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass-card border border-border/50 bg-card/50">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-foreground">Match Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    Personalized matches created based on complementary skills, shared interests, and aligned goals.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="glass-card border border-border/50 bg-card/50">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-foreground">Match Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    Receive detailed compatibility reports with actionable insights after the event concludes.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Algorithm Details */}
          <div className="mt-16 glass-card p-8 bg-card/50 border border-border/50">
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Our Matching Algorithm</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">Skill Complementarity</h4>
                <p className="text-sm text-muted-foreground">
                  Identifies professionals whose skills complement each other for potential collaboration opportunities.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">Interest Alignment</h4>
                <p className="text-sm text-muted-foreground">
                  Connects individuals with shared professional interests and industry passions.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">Goal Synergy</h4>
                <p className="text-sm text-muted-foreground">
                  Ensures matched participants have compatible objectives and networking goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};