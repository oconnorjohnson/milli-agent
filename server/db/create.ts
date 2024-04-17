"use server";
import { supabase } from "@/lib/initSupabase";
import { TablesInsert } from "@/types/db_types";

export async function createMeeting(
  MeetingData: TablesInsert<"Meetings">
): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("Meetings")
      .insert(MeetingData)
      .select("id")
      .single();
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(data);
      return data.id;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createSummary(
  SummaryData: TablesInsert<"Summaries">
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Summaries")
      .insert(SummaryData);
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log(data);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createTranscription(
  TranscriptionData: TablesInsert<"Transcriptions">
): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("Transcriptions")
      .insert(TranscriptionData)
      .select("id")
      .single();
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(data);
      return data.id;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
