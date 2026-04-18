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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          message: string | null
          name: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      emp_list: {
        Row: {
          designation: string
          id: number
          name: string
        }
        Insert: {
          designation: string
          id?: number
          name: string
        }
        Update: {
          designation?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          company_card_expiry: string | null
          company_card_no: string | null
          created_at: string | null
          employee_code: string
          experience: number | null
          full_bio: string | null
          is_director: boolean | null
          job_title: string | null
          name: string | null
          passport_expiry: string | null
          passport_number: string | null
          photo_url: string | null
          projects: string | null
          role: string | null
          sort_order: number | null
          specialization: string | null
        }
        Insert: {
          company_card_expiry?: string | null
          company_card_no?: string | null
          created_at?: string | null
          employee_code: string
          experience?: number | null
          full_bio?: string | null
          is_director?: boolean | null
          job_title?: string | null
          name?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          photo_url?: string | null
          projects?: string | null
          role?: string | null
          sort_order?: number | null
          specialization?: string | null
        }
        Update: {
          company_card_expiry?: string | null
          company_card_no?: string | null
          created_at?: string | null
          employee_code?: string
          experience?: number | null
          full_bio?: string | null
          is_director?: boolean | null
          job_title?: string | null
          name?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          photo_url?: string | null
          projects?: string | null
          role?: string | null
          sort_order?: number | null
          specialization?: string | null
        }
        Relationships: []
      }
      equipments: {
        Row: {
          created_at: string | null
          description: string
          id: number
          quantity: number
          sr_no: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          quantity: number
          sr_no: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          quantity?: number
          sr_no?: number
        }
        Relationships: []
      }
      machines: {
        Row: {
          description: string | null
          id: string
          image_url: string | null
          name: string | null
          quantity: number | null
        }
        Insert: {
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          quantity?: number | null
        }
        Update: {
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          quantity?: number | null
        }
        Relationships: []
      }
      project_details: {
        Row: {
          client_name: string | null
          consultant: string | null
          id: string
          project_name: string | null
          sr_no: number | null
          value_aed: string | null
        }
        Insert: {
          client_name?: string | null
          consultant?: string | null
          id?: string
          project_name?: string | null
          sr_no?: number | null
          value_aed?: string | null
        }
        Update: {
          client_name?: string | null
          consultant?: string | null
          id?: string
          project_name?: string | null
          sr_no?: number | null
          value_aed?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          actual_image_url: string | null
          actual_img_url_2: string | null
          actual_img_url_3: string | null
          actual_img_url_4: string | null
          actual_img_url_5: string | null
          category: string | null
          created_at: string | null
          goal_image_url: string | null
          id: number
          planned_img_url_2: string | null
          planned_img_url_3: string | null
          planned_img_url_4: string | null
          sr_no: number
          status: string | null
          title: string | null
        }
        Insert: {
          actual_image_url?: string | null
          actual_img_url_2?: string | null
          actual_img_url_3?: string | null
          actual_img_url_4?: string | null
          actual_img_url_5?: string | null
          category?: string | null
          created_at?: string | null
          goal_image_url?: string | null
          id?: number
          planned_img_url_2?: string | null
          planned_img_url_3?: string | null
          planned_img_url_4?: string | null
          sr_no?: number
          status?: string | null
          title?: string | null
        }
        Update: {
          actual_image_url?: string | null
          actual_img_url_2?: string | null
          actual_img_url_3?: string | null
          actual_img_url_4?: string | null
          actual_img_url_5?: string | null
          category?: string | null
          created_at?: string | null
          goal_image_url?: string | null
          id?: number
          planned_img_url_2?: string | null
          planned_img_url_3?: string | null
          planned_img_url_4?: string | null
          sr_no?: number
          status?: string | null
          title?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          logo_url: string | null
        }
        Insert: {
          id?: string
          logo_url?: string | null
        }
        Update: {
          id?: string
          logo_url?: string | null
        }
        Relationships: []
      }
      trade_licence: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      employees_detail: {
        Row: {
          employee_code: string | null
          experience: number | null
          full_bio: string | null
          is_director: boolean | null
          job_title: string | null
          name: string | null
          photo_url: string | null
          projects: string | null
          role: string | null
          sort_order: number | null
          specialization: string | null
        }
        Insert: {
          employee_code?: string | null
          experience?: number | null
          full_bio?: string | null
          is_director?: boolean | null
          job_title?: string | null
          name?: string | null
          photo_url?: string | null
          projects?: string | null
          role?: string | null
          sort_order?: number | null
          specialization?: string | null
        }
        Update: {
          employee_code?: string | null
          experience?: number | null
          full_bio?: string | null
          is_director?: boolean | null
          job_title?: string | null
          name?: string | null
          photo_url?: string | null
          projects?: string | null
          role?: string | null
          sort_order?: number | null
          specialization?: string | null
        }
        Relationships: []
      }
      employees_public: {
        Row: {
          employee_code: string | null
          is_director: boolean | null
          name: string | null
          photo_url: string | null
          role: string | null
          sort_order: number | null
        }
        Insert: {
          employee_code?: string | null
          is_director?: boolean | null
          name?: string | null
          photo_url?: string | null
          role?: string | null
          sort_order?: number | null
        }
        Update: {
          employee_code?: string | null
          is_director?: boolean | null
          name?: string | null
          photo_url?: string | null
          role?: string | null
          sort_order?: number | null
        }
        Relationships: []
      }
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
