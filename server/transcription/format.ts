"use server";
import { DeepgramResponse } from "@/types/deepgram_types";
import { updateTranscriptionWithFormattedText } from "@/server/db/update";

export async function formatTranscript({
  deepgramResponse,
  MeetingId,
}: {
  deepgramResponse: DeepgramResponse;
  MeetingId: number;
}): Promise<boolean> {
  const words =
    deepgramResponse.result.results.channels[0].alternatives[0].words;
  let currentSpeaker = words[0].speaker;
  let sentences: string[] = [];
  let sentence = `Speaker ${currentSpeaker}: `;
  words.forEach((word) => {
    if (word.speaker !== currentSpeaker) {
      sentences.push(sentence.trim());
      currentSpeaker = word.speaker;
      sentence = `Speaker ${currentSpeaker}: `;
    }
    sentence += word.punctuated_word + " ";
    // Add new line for a natural paragraph break after a certain number of words or punctuation.
    if (
      word.punctuated_word.endsWith(".") ||
      word.punctuated_word.endsWith("?") ||
      word.punctuated_word.endsWith("!")
    ) {
      sentence += "\n";
    }
  });
  // Append any remaining text in the sentence buffer.
  if (sentence.trim().length > 0) {
    sentences.push(sentence.trim());
  }
  const updatedTranscription = await updateTranscriptionWithFormattedText({
    formattedText: sentences.join("\n"),
    MeetingId: MeetingId,
  });
  if (updatedTranscription) {
    return true;
  } else {
    return false;
  }
}
