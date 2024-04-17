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
}): Promise<Tables<"Transcriptions">[]> {
  try {
    const { data, error } = await supabase
      .from("Transcriptions")
      .select("*")
      .eq("MeetingId", MeetingId)
      .single();
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
