"use server";
import { supabase } from "@/lib/initSupabase";
import { Tables } from "@/types/db_types";

export async function getMeetings(): Promise<Tables<"Meetings">[]> {
  try {
    const { data, error } = await supabase
      .from("Meetings")
      .select("*")
      .order("date", { ascending: false });
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getTranscriptionByMeetingId({
  MeetingId,
}: {
  MeetingId: number;
}): Promise<Tables<"Transcriptions">["text"]> {
  console.log("called getTranscriptionByMeetingId with MeetingId: ", MeetingId);
  try {
    const { data, error } = await supabase
      .from("Transcriptions")
      .select("text")
      .eq("MeetingId", MeetingId)
      .single();
    if (error) {
      console.log("error in reading transcription: ", error);
      throw error;
    } else {
      console.log(data);
      return data.text;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFormattedTranscriptionByMeetingId({
  MeetingId,
}: {
  MeetingId: number;
}): Promise<Tables<"Transcriptions">["formattedText"]> {
  try {
    const { data, error } = await supabase
      .from("Transcriptions")
      .select("formattedText")
      .eq("MeetingId", MeetingId)
      .single();
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(data);
      return data.formattedText;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
