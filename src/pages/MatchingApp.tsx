import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MatchFeed } from "@/components/matching/MatchFeed";
import { MessageList } from "@/components/messaging/MessageList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { Heart, MessageCircle, User, Settings, LogOut, Sparkles } from "lucide-react";
import { MatchProfile } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MatchingAppProps {
  onSignOut: () => void;
}

export function MatchingApp({ onSignOut }: MatchingAppProps) {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [newMatch, setNewMatch] = useState<MatchProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setUser({ ...user, profile });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onSignOut();
  };

  const handleMatchFound = (match: MatchProfile) => {
    setNewMatch(match);
    setShowMatchModal(true);
    setTimeout(() => {
      setShowMatchModal(false);
      setActiveTab("messages");
    }, 3000);
  };

  const handleSelectMatch = (match: any) => {
    setSelectedMatch(match);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Match Found Modal */}
      {showMatchModal && newMatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-8 text-center bg-gradient-primary text-white animate-slide-up">
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">It's a Match! 🎉</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback>{user?.profile?.full_name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Heart className="w-8 h-8 text-red-300" />
              <Avatar className="w-16 h-16">
                <AvatarImage src={newMatch.profile_picture_url} />
                <AvatarFallback>{newMatch.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-white/90 mb-4">
              You and {newMatch.name} liked each other!
            </p>
            <Button 
              variant="secondary" 
              onClick={() => {
                setShowMatchModal(false);
                setActiveTab("messages");
              }}
            >
              Send Message
            </Button>
          </Card>
        </div>
      )}

      {/* Main App */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">AI Matchmaking</h1>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback>{user?.profile?.full_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user?.profile?.full_name}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Discover Your Matches</h2>
              <p className="text-muted-foreground mb-8">
                Swipe through AI-curated profiles tailored just for you
              </p>
            </div>
            <MatchFeed onMatchFound={handleMatchFound} />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
              {/* Message List */}
              <div className={`${selectedMatch ? 'hidden lg:block' : ''}`}>
                <MessageList 
                  onSelectMatch={handleSelectMatch}
                  selectedMatchId={selectedMatch?.id}
                />
              </div>

              {/* Chat Window */}
              <div className={`lg:col-span-2 ${!selectedMatch ? 'hidden lg:flex lg:items-center lg:justify-center' : ''}`}>
                {selectedMatch ? (
                  <ChatWindow 
                    match={selectedMatch}
                    onBack={() => setSelectedMatch(null)}
                  />
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">
                        Choose a match from the list to start chatting
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">
                    {user?.profile?.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{user?.profile?.full_name}</h2>
                <p className="text-muted-foreground mb-4">{user?.profile?.bio}</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                  <div>
                    <h4 className="font-semibold mb-2">Purpose</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {user?.profile?.purpose?.replace('-', ' ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Age Range</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.age_range_min} - {user?.profile?.age_range_max} years
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Interests</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.lifestyle_interests?.slice(0, 3).join(', ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Values</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.important_values?.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="mt-6">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}