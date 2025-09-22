export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      event_registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          profile_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          profile_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          profile_id?: string
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          end_time: string | null
          id: string
          name: string
          start_time: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          name: string
          start_time?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          name?: string
          start_time?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          compatibility_reasons: string[]
          complementary_skills: string[]
          created_at: string
          id: string
          match_score: number
          matched_user_id: string
          user_id: string
        }
        Insert: {
          compatibility_reasons?: string[]
          complementary_skills?: string[]
          created_at?: string
          id?: string
          match_score: number
          matched_user_id: string
          user_id: string
        }
        Update: {
          compatibility_reasons?: string[]
          complementary_skills?: string[]
          created_at?: string
          id?: string
          match_score?: number
          matched_user_id?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          additional_info: string | null
          age_range_max: number | null
          age_range_min: number | null
          avatar_url: string | null
          bio: string | null
          communication_style: string | null
          completed_steps: string[] | null
          date_of_birth: string | null
          dealbreakers: string[] | null
          decision_making: string | null
          domain_knowledge: string | null
          email: string | null
          event_goal: string | null
          full_name: string | null
          gender: string | null
          hangout_activities: string[] | null
          hobbies: string[] | null
          id: string
          important_values: string[] | null
          industry_field: string | null
          interests: string[] | null
          lifestyle_interests: string[] | null
          location: string | null
          match_preferences_age_max: number | null
          match_preferences_age_min: number | null
          match_preferences_gender: string | null
          match_preferences_location: string | null
          name: string | null
          occupation: string | null
          personality_traits: string[] | null
          personality_type: string | null
          profile_picture_url: string | null
          purpose: string | null
          relationship_goals: string[] | null
          relationship_preferences: string[] | null
          skills: string[] | null
          skills_ai: number | null
          skills_design: number | null
          skills_finance: number | null
          skills_marketing: number | null
          skills_programming: number | null
          tech_buzzword: string | null
          updated_at: string | null
          user_id: string | null
          working_style: string | null
          year_of_study: string | null
        }
        Insert: {
          additional_info?: string | null
          age_range_max?: number | null
          age_range_min?: number | null
          avatar_url?: string | null
          bio?: string | null
          communication_style?: string | null
          completed_steps?: string[] | null
          date_of_birth?: string | null
          dealbreakers?: string[] | null
          decision_making?: string | null
          domain_knowledge?: string | null
          email?: string | null
          event_goal?: string | null
          full_name?: string | null
          gender?: string | null
          hangout_activities?: string[] | null
          hobbies?: string[] | null
          id: string
          important_values?: string[] | null
          industry_field?: string | null
          interests?: string[] | null
          lifestyle_interests?: string[] | null
          location?: string | null
          match_preferences_age_max?: number | null
          match_preferences_age_min?: number | null
          match_preferences_gender?: string | null
          match_preferences_location?: string | null
          name?: string | null
          occupation?: string | null
          personality_traits?: string[] | null
          personality_type?: string | null
          profile_picture_url?: string | null
          purpose?: string | null
          relationship_goals?: string[] | null
          relationship_preferences?: string[] | null
          skills?: string[] | null
          skills_ai?: number | null
          skills_design?: number | null
          skills_finance?: number | null
          skills_marketing?: number | null
          skills_programming?: number | null
          tech_buzzword?: string | null
          updated_at?: string | null
          user_id?: string | null
          working_style?: string | null
          year_of_study?: string | null
        }
        Update: {
          additional_info?: string | null
          age_range_max?: number | null
          age_range_min?: number | null
          avatar_url?: string | null
          bio?: string | null
          communication_style?: string | null
          completed_steps?: string[] | null
          date_of_birth?: string | null
          dealbreakers?: string[] | null
          decision_making?: string | null
          domain_knowledge?: string | null
          email?: string | null
          event_goal?: string | null
          full_name?: string | null
          gender?: string | null
          hangout_activities?: string[] | null
          hobbies?: string[] | null
          id?: string
          important_values?: string[] | null
          industry_field?: string | null
          interests?: string[] | null
          lifestyle_interests?: string[] | null
          location?: string | null
          match_preferences_age_max?: number | null
          match_preferences_age_min?: number | null
          match_preferences_gender?: string | null
          match_preferences_location?: string | null
          name?: string | null
          occupation?: string | null
          personality_traits?: string[] | null
          personality_type?: string | null
          profile_picture_url?: string | null
          purpose?: string | null
          relationship_goals?: string[] | null
          relationship_preferences?: string[] | null
          skills?: string[] | null
          skills_ai?: number | null
          skills_design?: number | null
          skills_finance?: number | null
          skills_marketing?: number | null
          skills_programming?: number | null
          tech_buzzword?: string | null
          updated_at?: string | null
          user_id?: string | null
          working_style?: string | null
          year_of_study?: string | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string
          event_id: string
          id: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: never
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: never
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          created_at: string
          id: string
          interaction_type: string
          message_content: string | null
          target_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interaction_type: string
          message_content?: string | null
          target_user_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interaction_type?: string
          message_content?: string | null
          target_user_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
