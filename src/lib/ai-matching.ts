// src/lib/ai-matching.ts

export interface ProfileData {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  profile_picture_url: string;
}

interface CompatibilityResult {
  score: number;
  reasons: string[];
}

/**
 * Calculate compatibility score between two users.
 */
export function calculateCompatibility(
  user: ProfileData,
  target: ProfileData
): CompatibilityResult {
  let score = 50; // baseline
  const reasons: string[] = [];

  // ✅ Age difference check (closer ages = better match)
  const ageDiff = Math.abs(user.age - target.age);
  if (ageDiff <= 2) {
    score += 15;
    reasons.push("Similar age");
  } else if (ageDiff <= 5) {
    score += 10;
    reasons.push("Close age range");
  } else {
    score -= 5;
    reasons.push("Large age difference");
  }

  // ✅ Interests overlap
  const commonInterests = user.interests.filter((i) =>
    target.interests.includes(i)
  );
  if (commonInterests.length > 0) {
    score += commonInterests.length * 5;
    reasons.push(`Shared interests: ${commonInterests.join(", ")}`);
  }

  // ✅ Bio keyword matching (basic NLP)
  if (user.bio && target.bio) {
    const userWords = user.bio.toLowerCase().split(/\W+/);
    const targetWords = target.bio.toLowerCase().split(/\W+/);
    const overlap = userWords.filter((w) => targetWords.includes(w));
    if (overlap.length > 3) {
      score += 10;
      reasons.push("Similar bio vibes");
    }
  }

  // ✅ Normalize score
  if (score > 99) score = 99;
  if (score < 0) score = 0;

  return { score, reasons };
}
