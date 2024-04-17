"use server";
import { createClient } from "@deepgram/sdk";

export async function TranscribeMeeting({ URL }: { URL: string }) {
  if (!process.env.DEEPGRAM_API_KEY) {
    throw new Error("DEEPGRAM_API_KEY is not set");
  }
  const url = "utfs.io/f/8b110c63-bfa7-474b-92a9-8a4f9763f1e2-2diidr.mp3";
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
    return transcriptionText;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
