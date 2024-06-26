"use server";
import { createClient } from "@deepgram/sdk";
import { createTranscription } from "@/server/db/create";
import { updateMeeting } from "@/server/db/update";
import { formatTranscript } from "@/server/transcription/format";
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
      { model: "nova-2", diarize: true, punctuate: true, smart_format: true }
    );
    console.log(transcriptionResult);
    const transcriptionJson = transcriptionResult;
    if (transcriptionJson) {
      const transcriptionId = await createTranscription({
        MeetingId: MeetingId,
        text: JSON.parse(JSON.stringify(transcriptionJson)),
      });
      if (transcriptionId) {
        await updateMeeting({
          id: MeetingId,
          TranscriptionId: transcriptionId,
        });
      }
      const addedFormattedTranscript = await formatTranscript({
        // @ts-ignore
        deepgramResponse: transcriptionJson,
        MeetingId: MeetingId,
      });
      if (addedFormattedTranscript) {
        return true;
      }
    } else {
      console.log("transcriptionJson is null");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
