"use server";
import { supabase } from "@/lib/initSupabase";
import { TablesInsert } from "@/types/db_types";

export async function createMeeting(
  MeetingData: TablesInsert<"Meetings">
): Promise<boolean> {
  try {
    const { data, error } = await supabase.from("Meetings").insert(MeetingData);
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

export async function createRecording(
  RecordingData: TablesInsert<"Recordings">
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Recordings")
      .insert(RecordingData);
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
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Transcriptions")
      .insert(TranscriptionData);
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
