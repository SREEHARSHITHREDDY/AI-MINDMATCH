import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Sparkles, Trophy, ArrowLeft, Share2 } from "lucide-react";

interface MatchResult {
  id: string;
  name: string;
  yearOfStudy: string;
  domainKnowledge: string;
  workingStyle: string;
  personalityType: string;
  eventGoal: string;
  techBuzzword: string;
  interests: string[];
  matchScore: number;
  compatibilityReasons: string[];
  complementarySkills: string[];
}

interface MatchResultsProps {
  matches: MatchResult[];
  userName: string;
  onBack: () => void;
}

export function MatchResults({ matches, userName, onBack }: MatchResultsProps) {
  const getMatchCategory = (score: number) => {
    if (score >= 80) return { label: "Perfect Match", emoji: "🔥", color: "perfect-match" };
    if (score >= 60) return { label: "Good Match", emoji: "😊", color: "good-match" };
    if (score >= 40) return { label: "Moderate Match", emoji: "🙂", color: "moderate-match" };
    return { label: "Unlikely Match", emoji: "😅", color: "unlikely-match" };
  };

  const topMatch = matches[0];
  const category = getMatchCategory(topMatch.matchScore);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-gradient-success animate-pulse-glow">
            <Heart className="h-8 w-8 text-accent-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Your AI Matches Are Ready!
        </h1>
        <p className="text-xl text-muted-foreground">
          Hey {userName}, we found {matches.length} perfect connections for you
        </p>
      </div>

      {/* Top Match Highlight */}
      <Card className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-glow">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Your Top Match</CardTitle>
          </div>
          <div className="text-6xl mb-2">{category.emoji}</div>
          <CardDescription className="text-lg">
            {category.label} - {topMatch.matchScore}% Compatibility
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          <div className="bg-card rounded-lg p-6 mb-4">
            <h3 className="text-2xl font-bold text-card-foreground mb-2">{topMatch.name}</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="secondary">{topMatch.yearOfStudy}</Badge>
              <Badge variant="secondary">{topMatch.domainKnowledge}</Badge>
              <Badge variant="secondary">{topMatch.personalityType}</Badge>
            </div>
            
            <Progress 
              value={topMatch.matchScore} 
              className="w-full max-w-md mx-auto mb-4 h-3"
            />
            
            <div className="grid md:grid-cols-2 gap-4 text-left mt-6">
              <div>
                <h4 className="font-semibold text-primary mb-2">Why You Match:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {topMatch.compatibilityReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-2">Complementary Skills:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {topMatch.complementarySkills.map((skill, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="professional" size="lg">
              <Users className="mr-2 h-5 w-5" />
              Connect Now
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="mr-2 h-5 w-5" />
              Share Result
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Matches Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">All Your Matches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => {
            const matchCategory = getMatchCategory(match.matchScore);
            return (
              <Card 
                key={match.id} 
                className={`shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 ${
                  index === 0 ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{match.name}</CardTitle>
                    <div className="text-2xl">{matchCategory.emoji}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={match.matchScore} className="flex-1 h-2" />
                    <span className="text-sm font-semibold text-primary">
                      {match.matchScore}%
                    </span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`text-center w-fit mx-auto text-${matchCategory.color}`}
                  >
                    {matchCategory.label}
                  </Badge>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">{match.yearOfStudy}</Badge>
                      <Badge variant="outline" className="text-xs">{match.domainKnowledge}</Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Goal:</strong> {match.eventGoal}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Loves:</strong> {match.techBuzzword}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">Shared Interests:</p>
                      <div className="flex flex-wrap gap-1">
                        {match.interests.slice(0, 3).map((interest, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                        {match.interests.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{match.interests.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" size="lg" onClick={onBack}>
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Profile
        </Button>
        <Button variant="professional" size="lg">
          <Sparkles className="mr-2 h-5 w-5" />
          Find More Matches
        </Button>
      </div>
    </div>
  );
}