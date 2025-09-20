import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Smile, ArrowLeft } from "lucide-react";
import { Message } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Match {
  id: string;
  name: string;
  profile_picture_url?: string;
}

interface ChatWindowProps {
  match: Match;
  onBack?: () => void;
}

export function ChatWindow({ match, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
  }, [match.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: messagesData, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${match.id}),and(sender_id.eq.${match.id},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Add some demo messages if none exist
      if (!messagesData || messagesData.length === 0) {
        const demoMessages: Message[] = [
          {
            id: '1',
            sender_id: match.id,
            receiver_id: user.id,
            content: "Hey! Nice to match with you 😊",
            read: true,
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: '2',
            sender_id: user.id,
            receiver_id: match.id,
            content: "Hi! Thanks for the like. Looking forward to getting to know you!",
            read: true,
            created_at: new Date(Date.now() - 3000000).toISOString(),
          },
        ];
        setMessages(demoMessages);
      } else {
        setMessages(messagesData);
      }

      setIsLoading(false);
    } catch (error: any) {
      toast({
        title: "Error loading messages",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const message: Omit<Message, 'id'> = {
        sender_id: user.id,
        receiver_id: match.id,
        content: newMessage.trim(),
        read: false,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, data]);
      setNewMessage("");
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoading) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading conversation...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      {/* Chat Header */}
      <CardHeader className="flex flex-row items-center gap-3 py-4 border-b">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        <Avatar className="w-10 h-10">
          <AvatarImage src={match.profile_picture_url} />
          <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{match.name}</h3>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const [currentUser, setCurrentUser] = useState<any>(null);
          
          useEffect(() => {
            supabase.auth.getUser().then(({ data: { user } }) => {
              setCurrentUser(user);
            });
          }, []);
          
          const isOwnMessage = message.sender_id === currentUser?.id;
          
          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isOwnMessage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                }`}>
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Icebreaker suggestions */}
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewMessage("What's your favorite way to spend weekends?")}
            className="text-xs"
          >
            Weekend plans? 🌟
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewMessage("I'd love to know more about your interests!")}
            className="text-xs"
          >
            Tell me more! 💭
          </Button>
        </div>
      </div>
    </Card>
  );
}