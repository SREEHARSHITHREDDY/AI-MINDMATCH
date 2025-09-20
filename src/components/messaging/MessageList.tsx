import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface Match {
  id: string;
  name: string;
  profile_picture_url?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}

interface MessageListProps {
  onSelectMatch: (match: Match) => void;
  selectedMatchId?: string;
}

export function MessageList({ onSelectMatch, selectedMatchId }: MessageListProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's matches
      const { data: interactions } = await supabase
        .from('user_interactions')
        .select(`
          target_user_id,
          profiles!user_interactions_target_user_id_fkey(
            id,
            name,
            profile_picture_url
          )
        `)
        .eq('user_id', user.id)
        .eq('interaction_type', 'match');

      // Mock data for demo
      const mockMatches: Match[] = interactions?.map((interaction: any, index) => ({
        id: interaction.target_user_id,
        name: interaction.profiles?.name || 'Unknown User',
        profile_picture_url: interaction.profiles?.profile_picture_url,
        lastMessage: index === 0 ? "Hey! Nice to match with you 😊" : 
                    index === 1 ? "Thanks for the super like!" :
                    "Looking forward to chatting!",
        lastMessageTime: index === 0 ? "2 min ago" : 
                        index === 1 ? "1 hour ago" :
                        "3 hours ago",
        unreadCount: index === 0 ? 2 : index === 1 ? 1 : 0,
      })) || [];

      setMatches(mockMatches);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading matches:', error);
      setIsLoading(false);
    }
  };

  const filteredMatches = matches.filter(match =>
    match.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Messages
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-y-auto flex-1">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No matches yet</p>
            <p className="text-sm text-muted-foreground">Start swiping to find connections!</p>
          </div>
        ) : (
          <div className="space-y-0">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                  selectedMatchId === match.id ? 'bg-primary/10' : ''
                }`}
                onClick={() => onSelectMatch(match)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={match.profile_picture_url} />
                    <AvatarFallback>
                      {match.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold truncate">{match.name}</h4>
                      <div className="flex items-center gap-2">
                        {match.unreadCount > 0 && (
                          <Badge variant="default" className="text-xs">
                            {match.unreadCount}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {match.lastMessageTime}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {match.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}