import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Brain, Calendar, Target, CheckCircle, Network, Zap, Star, TrendingUp } from "lucide-react";

interface HowItWorksProps {
  onBack: () => void;
}

export const HowItWorks = ({ onBack }: HowItWorksProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-12">
          <Button 
            variant="glass" 
            onClick={onBack}
            className="mb-8 bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <div className="text-center slide-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              How Our AI Matchmaking
              <span className="block text-white/90">Works</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Understanding our comprehensive process for creating meaningful professional connections
            </p>
          </div>
        </div>
      </div>

      {/* Process Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              The Science Behind Perfect Matches
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered system analyzes multiple dimensions of professional compatibility to ensure 
              every connection has the potential for meaningful collaboration and mutual growth.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center gentle-float">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Multi-dimensional Analysis</h3>
              <p className="text-muted-foreground">Advanced algorithms process skills, interests, and goals simultaneously</p>
            </div>
            
            <div className="text-center gentle-float" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Personalized Insights</h3>
              <p className="text-muted-foreground">Each match comes with detailed compatibility explanations</p>
            </div>
            
            <div className="text-center gentle-float" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Network Growth</h3>
              <p className="text-muted-foreground">Quality improves as our community grows and learns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Step-by-Step Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From registration to receiving your matches, here's how the magic happens
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group glass-card border border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="w-8 h-1 bg-primary/30 rounded mx-auto mb-4"></div>
                <CardTitle className="text-xl text-foreground">Profile Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center">
                  Complete comprehensive profiling including skills, interests, goals, and networking preferences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group glass-card border border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="w-8 h-1 bg-primary/50 rounded mx-auto mb-4"></div>
                <CardTitle className="text-xl text-foreground">AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center">
                  Advanced algorithms process all profiles to identify optimal compatibility patterns and connections.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group glass-card border border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <div className="w-8 h-1 bg-primary/70 rounded mx-auto mb-4"></div>
                <CardTitle className="text-xl text-foreground">Match Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center">
                  Personalized matches created based on complementary skills, shared interests, and aligned goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group glass-card border border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div className="w-8 h-1 bg-primary rounded mx-auto mb-4"></div>
                <CardTitle className="text-xl text-foreground">Match Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center">
                  Receive detailed compatibility reports with actionable insights after the event concludes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Algorithm Details */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Matching Algorithm</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three core pillars that power our intelligent matching system
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Brain className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Skill Complementarity</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Identifies professionals whose skills complement each other for potential collaboration opportunities and mutual growth.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Target className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Interest Alignment</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connects individuals with shared professional interests and industry passions for meaningful conversations.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Network className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Goal Synergy</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ensures matched participants have compatible objectives and networking goals for successful partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};