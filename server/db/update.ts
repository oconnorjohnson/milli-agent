"use server";
import { supabase } from "@/lib/initSupabase";
import { TablesUpdate } from "@/types/db_types";

export async function updateMeeting(
  MeetingData: TablesUpdate<"Meetings">
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Meetings")
      .update(MeetingData)
      .eq("id", MeetingData.id);
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

export async function updateSummary(
  SummaryData: TablesUpdate<"Summaries">
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Summaries")
      .update(SummaryData)
      .eq("id", SummaryData.id);
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

export async function updateTranscription(
  TranscriptionData: TablesUpdate<"Transcriptions">
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Transcriptions")
      .update(TranscriptionData)
      .eq("id", TranscriptionData.id);
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
