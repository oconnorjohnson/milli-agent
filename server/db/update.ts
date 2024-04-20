"use server";
import { supabase } from "@/lib/initSupabase";
import { TablesUpdate } from "@/types/db_types";

export async function updateTranscriptionWithChunkedResponses({ Responses, MeetingId }: { Responses: string, MeetingId: number }): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Transcriptions")
      .update({ "responses": Responses })
      .eq("MeetingId", MeetingId);
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

export async function updateTranscriptionWithFormattedText({
  formattedText,
  MeetingId,
}: {
  formattedText: string;
  MeetingId: number;
}): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Transcriptions")
      .update({ formattedText: formattedText })
      .eq("MeetingId", MeetingId);
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(data);
      return true;
    }
  } catch (error) {
    console.log(error);
    throw error;
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
