import { calculateCompatibility } from "@/lib/ai-matching";

// Inside loadMatches()
const mockMatches: MatchProfile[] =
  profiles?.map((profile) => {
    const currentUser: MatchProfile = {
      id: "me", // replace with supabase.auth.user id if needed
      name: "You",
      age: 25,
      bio: "Demo user bio",
      interests: ["music", "travel", "tech"], // replace with actual logged-in user data
      profile_picture_url: "",
      compatibility_score: 0,
      distance: "0 km",
    };

    const targetUser: MatchProfile = {
      id: profile.id,
      name: profile.name,
      age: profile.date_of_birth
        ? Math.floor(
            (Date.now() - new Date(profile.date_of_birth).getTime()) /
              (365.25 * 24 * 60 * 60 * 1000)
          )
        : 25,
      bio: profile.bio || "No bio available",
      interests: Array.isArray(profile.lifestyle_interests)
        ? profile.lifestyle_interests
        : [],
      profile_picture_url: profile.profile_picture_url,
      compatibility_score: 0,
      distance: `${Math.floor(Math.random() * 20) + 1} km away`,
    };

    const { score } = calculateCompatibility(currentUser, targetUser);

    return { ...targetUser, compatibility_score: score };
  }) || [];
