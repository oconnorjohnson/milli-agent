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
