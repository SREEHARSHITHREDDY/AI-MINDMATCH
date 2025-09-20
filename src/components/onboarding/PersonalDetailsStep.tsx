import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User } from "lucide-react";

interface PersonalDetailsData {
  gender: string;
  date_of_birth: string;
  bio: string;
  relationship_goals?: string;
  hangout_activities?: string;
  industry_field?: string;
}

interface PersonalDetailsStepProps {
  purpose: 'relationship' | 'friendship' | 'professional' | 'explore';
  onNext: (data: PersonalDetailsData) => void;
  onBack: () => void;
  initialData?: Partial<PersonalDetailsData>;
}

export function PersonalDetailsStep({ purpose, onNext, onBack, initialData }: PersonalDetailsStepProps) {
  const [formData, setFormData] = useState<PersonalDetailsData>({
    gender: initialData?.gender || "",
    date_of_birth: initialData?.date_of_birth || "",
    bio: initialData?.bio || "",
    relationship_goals: initialData?.relationship_goals || "",
    hangout_activities: initialData?.hangout_activities || "",
    industry_field: initialData?.industry_field || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid = formData.gender && formData.date_of_birth && formData.bio;

  const renderPurposeSpecificFields = () => {
    switch (purpose) {
      case 'relationship':
        return (
          <div className="space-y-2">
            <Label htmlFor="relationship_goals">Relationship Goals / Expectations</Label>
            <Textarea
              id="relationship_goals"
              value={formData.relationship_goals}
              onChange={(e) => setFormData(prev => ({ ...prev, relationship_goals: e.target.value }))}
              placeholder="What are you looking for in a relationship?"
              className="min-h-20"
            />
          </div>
        );

      case 'friendship':
        return (
          <div className="space-y-2">
            <Label htmlFor="hangout_activities">Preferred Hangout Types / Activities</Label>
            <Textarea
              id="hangout_activities"
              value={formData.hangout_activities}
              onChange={(e) => setFormData(prev => ({ ...prev, hangout_activities: e.target.value }))}
              placeholder="What kind of activities do you enjoy with friends?"
              className="min-h-20"
            />
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-2">
            <Label htmlFor="industry_field">Industry / Field</Label>
            <Input
              id="industry_field"
              value={formData.industry_field}
              onChange={(e) => setFormData(prev => ({ ...prev, industry_field: e.target.value }))}
              placeholder="e.g., Technology, Healthcare, Finance"
            />
          </div>
        );

      case 'explore':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="relationship_goals">Relationship Interests (optional)</Label>
              <Textarea
                id="relationship_goals"
                value={formData.relationship_goals}
                onChange={(e) => setFormData(prev => ({ ...prev, relationship_goals: e.target.value }))}
                placeholder="Any thoughts on romantic connections?"
                className="min-h-16"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hangout_activities">Social Activities (optional)</Label>
              <Textarea
                id="hangout_activities"
                value={formData.hangout_activities}
                onChange={(e) => setFormData(prev => ({ ...prev, hangout_activities: e.target.value }))}
                placeholder="What social activities interest you?"
                className="min-h-16"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getPurposeTitle = () => {
    switch (purpose) {
      case 'relationship': return 'Relationship Details';
      case 'friendship': return 'Friendship Preferences';
      case 'professional': return 'Professional Information';
      case 'explore': return 'Personal Preferences';
      default: return 'Personal Details';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="glass-card border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-primary">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">{getPurposeTitle()}</CardTitle>
            <CardDescription>
              Tell us more about yourself and what you're looking for
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common fields for all purposes */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Short Description</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell people about yourself..."
                  className="min-h-24"
                  required
                />
              </div>

              {/* Purpose-specific fields */}
              {renderPurposeSpecificFields()}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!isValid}
              >
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}