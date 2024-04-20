"use server";
import { supabase } from "@/lib/initSupabase";
import { TablesInsert } from "@/types/db_types";

// Define `Chunk` as an interface for individual chunk objects
interface Chunk {
  topic: string;
  chunk: string;
}

// Use `Chunk[]` as the type for `TopicChunkData`
export async function createTopicChunks({ TopicChunkData }: { TopicChunkData: Chunk[] }): Promise<boolean> {
  try { 
    // save each chunk of topic chunk data in a new row in the TopicChunks table
    const { data, error } = await supabase
      .from("TopicChunks")
      .insert(TopicChunkData);
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log(data);
      return true;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
