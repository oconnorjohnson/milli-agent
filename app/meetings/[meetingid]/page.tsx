import { getTranscriptionByMeetingId } from "@/server/db/read";
import type { DeepgramResponse } from "@/types/deepgram_types";
import Chat from "@/components/meetings/chat-with-script";
import AnalyzeScriptButton from "@/components/meetings/analyze-script";

function formatTranscript(
  deepgramResponse: DeepgramResponse
): { speaker: string; text: string }[] {
  const words =
    deepgramResponse.result.results.channels[0].alternatives[0].words;
  let currentSpeaker = words[0].speaker;
  let sentences: { speaker: string; text: string }[] = [];
  let sentence = "";
  words.forEach((word) => {
    if (word.speaker !== currentSpeaker) {
      sentences.push({
        speaker: `Speaker ${currentSpeaker}`,
        text: sentence.trim(),
      });
      currentSpeaker = word.speaker;
      sentence = "";
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
    sentences.push({
      speaker: `Speaker ${currentSpeaker}`,
      text: sentence.trim(),
    });
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
      <AnalyzeScriptButton MeetingId={MeetingId} />
      <div className="flex flex-cols-2 gap-4">
        <div className="w-1/2">
          {formattedTranscript.map((paragraph, index) => (
            <p key={index} className="mb-4">
              <span className="font-bold text-lg">{paragraph.speaker}:</span>
              <span className="ml-2">{paragraph.text}</span>
            </p>
          ))}
        </div>
        <div className="w-1/2">
          <Chat />
        </div>
      </div>
    </div>
  );
}
