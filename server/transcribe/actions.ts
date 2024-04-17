"use server";
import { createClient } from "@deepgram/sdk";
import { createTranscription } from "@/server/db/create";
export async function TranscribeMeeting({
  URL,
  MeetingId,
}: {
  URL: string;
  MeetingId: number;
}) {
  if (!process.env.DEEPGRAM_API_KEY) {
    throw new Error("DEEPGRAM_API_KEY is not set");
  }
  try {
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
    const transcriptionResult = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: URL,
      },
      { diarize: true, punctuate: true, smart_format: true }
    );
    console.log(transcriptionResult);
    const transcriptionText =
      transcriptionResult!.result!.results.channels[0].alternatives[0]
        .transcript;
    console.log(transcriptionText);
    if (transcriptionText) {
      const transcriptionJson = { transcript: transcriptionText };
      const transcriptionId = await createTranscription({
        MeetingId: MeetingId,
        text: transcriptionJson,
      });
      return transcriptionId;
    } else {
      console.log("transcriptionText is null");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
