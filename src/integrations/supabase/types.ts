export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: number
          password: string
          username: string
        }
        Insert: {
          id?: number
          password: string
          username: string
        }
        Update: {
          id?: number
          password?: string
          username?: string
        }
        Relationships: []
      }
      available_dates: {
        Row: {
          car_id: number | null
          date: string
          id: number
        }
        Insert: {
          car_id?: number | null
          date: string
          id?: number
        }
        Update: {
          car_id?: number | null
          date?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "available_dates_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          car_id: number | null
          car_name: string
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          end_date: string
          id: number
          start_date: string
          status: string
        }
        Insert: {
          car_id?: number | null
          car_name: string
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone: string
          end_date: string
          id?: number
          start_date: string
          status: string
        }
        Update: {
          car_id?: number | null
          car_name?: string
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string
          end_date?: string
          id?: number
          start_date?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      car_renters: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          email: string | null
          featured_cars: string[] | null
          id: number
          image: string | null
          member_since: string | null
          name: string
          phone: string | null
          rating: number | null
          review_count: number | null
          specialties: string[] | null
          verification: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured_cars?: string[] | null
          id?: number
          image?: string | null
          member_since?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          specialties?: string[] | null
          verification?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured_cars?: string[] | null
          id?: number
          image?: string | null
          member_since?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          review_count?: number | null
          specialties?: string[] | null
          verification?: string | null
        }
        Relationships: []
      }
      cars: {
        Row: {
          category: string
          description: string | null
          features: string[] | null
          id: number
          image: string
          images: string[] | null
          locations: string[] | null
          name: string
          per_day: boolean
          price: number
          specs: string[]
        }
        Insert: {
          category: string
          description?: string | null
          features?: string[] | null
          id?: number
          image: string
          images?: string[] | null
          locations?: string[] | null
          name: string
          per_day?: boolean
          price: number
          specs?: string[]
        }
        Update: {
          category?: string
          description?: string | null
          features?: string[] | null
          id?: number
          image?: string
          images?: string[] | null
          locations?: string[] | null
          name?: string
          per_day?: boolean
          price?: number
          specs?: string[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
