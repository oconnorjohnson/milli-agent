export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      Meetings: {
        Row: {
          created_at: string;
          date: string;
          description: string;
          id: number;
          RecordingId: number | null;
          recordingUrl: string | null;
          SummaryId: number | null;
          title: string;
          TranscriptionId: number | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          description: string;
          id?: number;
          RecordingId?: number | null;
          recordingUrl?: string | null;
          SummaryId?: number | null;
          title: string;
          TranscriptionId?: number | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          description?: string;
          id?: number;
          RecordingId?: number | null;
          recordingUrl?: string | null;
          SummaryId?: number | null;
          title?: string;
          TranscriptionId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_Meetings_SummaryId_fkey";
            columns: ["SummaryId"];
            isOneToOne: true;
            referencedRelation: "Summaries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_Meetings_TranscriptionId_fkey";
            columns: ["TranscriptionId"];
            isOneToOne: true;
            referencedRelation: "Transcriptions";
            referencedColumns: ["id"];
          }
        ];
      };
      Summaries: {
        Row: {
          created_at: string;
          id: number;
          MeetingId: number;
          text: Json;
        };
        Insert: {
          created_at?: string;
          id?: number;
          MeetingId: number;
          text: Json;
        };
        Update: {
          created_at?: string;
          id?: number;
          MeetingId?: number;
          text?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "public_Summaries_MeetingId_fkey";
            columns: ["MeetingId"];
            isOneToOne: true;
            referencedRelation: "Meetings";
            referencedColumns: ["id"];
          }
        ];
      };
      Transcriptions: {
        Row: {
          created_at: string;
          formattedText: string | null;
          id: number;
          MeetingId: number;
          text: Json;
        };
        Insert: {
          created_at?: string;
          formattedText?: string | null;
          id?: number;
          MeetingId: number;
          text: Json;
        };
        Update: {
          created_at?: string;
          formattedText?: string | null;
          id?: number;
          MeetingId?: number;
          text?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "public_Transcriptions_MeetingId_fkey";
            columns: ["MeetingId"];
            isOneToOne: true;
            referencedRelation: "Meetings";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
