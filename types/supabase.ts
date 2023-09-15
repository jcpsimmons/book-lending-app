export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          author: string
          created_at: string
          id: number
          lent_to: string | null
          title: string
          user_id: string
        }
        Insert: {
          author: string
          created_at?: string
          id?: number
          lent_to?: string | null
          title: string
          user_id: string
        }
        Update: {
          author?: string
          created_at?: string
          id?: number
          lent_to?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "books_lent_to_fkey"
            columns: ["lent_to"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users_public: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_public_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
