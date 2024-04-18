import { getTranscriptionByMeetingId } from "@/server/db/read";
import type { DeepgramResponse } from "@/types/deepgram_types";
import { Card } from "@/components/ui/card";
import MeetingPage from "@/components/meetings/meeting-page";
import type { Json } from "@/types/db_types";
import { updateTranscriptionWithFormattedText } from "@/server/db/update";

function formatTranscript(deepgramResponse: DeepgramResponse): string[] {
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
  return sentences;
}

export default async function MeetingId({
  params,
}: {
  params: { meetingid: string };
}) {
  const MeetingId = Number(params.meetingid);
  console.log(
    "calling getTranscriptionByMeetingId with MeetingId: ",
    MeetingId
  );
  const transcript = await getTranscriptionByMeetingId({
    MeetingId: MeetingId,
  });
  console.log("transcription: ", transcript);

  const transcription = transcript;
  // @ts-ignore
  const formattedTranscript = formatTranscript(transcription);
  return (
    <div>
      <div>
        {formattedTranscript.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
