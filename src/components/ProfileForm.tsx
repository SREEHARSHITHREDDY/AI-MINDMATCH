import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormProps {
  onSuccess: () => void;
}

export default function ProfileForm({ onSuccess }: ProfileFormProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [relationshipPreferences, setRelationshipPreferences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("profiles")
        .update({
          name,
          bio,
          lifestyle_interests: interests,
          relationship_preferences: relationshipPreferences,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your profile has been saved successfully.",
      });

      onSuccess(); // navigate to match feed
    } catch (err: any) {
      toast({
        title: "Profile update error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input input-bordered w-full"
      />

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="textarea textarea-bordered w-full"
      />

      <input
        type="text"
        placeholder="Interests (comma separated)"
        value={interests.join(", ")}
        onChange={(e) =>
          setInterests(e.target.value.split(",").map((i) => i.trim()))
        }
        className="input input-bordered w-full"
      />

      <input
        type="text"
        placeholder="Relationship Preferences (comma separated)"
        value={relationshipPreferences.join(", ")}
        onChange={(e) =>
          setRelationshipPreferences(
            e.target.value.split(",").map((i) => i.trim())
          )
        }
        className="input input-bordered w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
