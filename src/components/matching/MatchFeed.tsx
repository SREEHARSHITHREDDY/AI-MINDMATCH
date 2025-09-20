import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, X, Star, MessageCircle, MapPin } from "lucide-react";
import { MatchProfile } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MatchFeedProps {
  onMatchFound: (match: MatchProfile) => void;
}

export function MatchFeed({ onMatchFound }: MatchFeedProps) {
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      // For demo purposes, we'll use existing profiles as potential matches
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(10);

      if (error) throw error;

      const mockMatches: MatchProfile[] = profiles?.map((profile, index) => ({
        id: profile.id,
        name: profile.name,
        age: profile.date_of_birth ? 
          Math.floor((Date.now() - new Date(profile.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 
          25,
        bio: profile.bio || "No bio available",
        interests: Array.isArray(profile.lifestyle_interests) ? profile.lifestyle_interests : [],
        profile_picture_url: profile.profile_picture_url,
        compatibility_score: Math.floor(Math.random() * 30) + 70, // 70-99%
        distance: `${Math.floor(Math.random() * 20) + 1} km away`,
      })) || [];

      setMatches(mockMatches);
      setIsLoading(false);
    } catch (error: any) {
      toast({
        title: "Error loading matches",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleInteraction = async (type: 'like' | 'super_like' | 'pass') => {
    const currentMatch = matches[currentMatchIndex];
    if (!currentMatch) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await supabase
        .from('user_interactions')
        .insert({
          user_id: user.id,
          target_user_id: currentMatch.id,
          interaction_type: type,
        });

      if (type === 'like' || type === 'super_like') {
        // Check if it's a mutual match
        const isMatch = Math.random() > 0.7; // 30% chance of match for demo
        if (isMatch) {
          await supabase
            .from('user_interactions')
            .insert({
              user_id: user.id,
              target_user_id: currentMatch.id,
              interaction_type: 'match',
            });

          onMatchFound(currentMatch);
          toast({
            title: "It's a Match! 🎉",
            description: `You and ${currentMatch.name} liked each other!`,
          });
        }
      }

      // Move to next match
      setCurrentMatchIndex(prev => prev + 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (currentMatchIndex >= matches.length) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No more matches for now</h3>
        <p className="text-muted-foreground mb-4">Check back later for new potential connections!</p>
        <Button onClick={loadMatches}>Refresh</Button>
      </div>
    );
  }

  const currentMatch = matches[currentMatchIndex];

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden shadow-lg">
        {/* Profile Image */}
        <div className="relative h-96 bg-gradient-primary">
          <Avatar className="w-full h-full rounded-none">
            <AvatarImage 
              src={currentMatch.profile_picture_url} 
              className="object-cover"
            />
            <AvatarFallback className="w-full h-full bg-gradient-primary text-white text-6xl">
              {currentMatch.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          {/* Compatibility Score */}
          <Badge className="absolute top-4 right-4 bg-white/90 text-primary">
            {currentMatch.compatibility_score}% Match
          </Badge>
        </div>

        <CardContent className="p-6">
          {/* Basic Info */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{currentMatch.name}, {currentMatch.age}</h2>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {currentMatch.distance}
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {currentMatch.bio}
          </p>

          {/* Interests */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Interests</h4>
            <div className="flex flex-wrap gap-1">
              {currentMatch.interests.slice(0, 6).map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 p-0 border-red-200 hover:bg-red-50"
              onClick={() => handleInteraction('pass')}
            >
              <X className="w-6 h-6 text-red-500" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 p-0 border-yellow-200 hover:bg-yellow-50"
              onClick={() => handleInteraction('super_like')}
            >
              <Star className="w-6 h-6 text-yellow-500" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-16 h-16 p-0 border-green-200 hover:bg-green-50"
              onClick={() => handleInteraction('like')}
            >
              <Heart className="w-6 h-6 text-green-500" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicator */}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        {currentMatchIndex + 1} of {matches.length}
      </div>
    </div>
  );
}