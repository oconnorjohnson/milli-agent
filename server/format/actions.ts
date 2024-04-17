import type { DeepgramResponse, SpeakerSegment } from "@/types/deepgram_types";

export function formatTranscriptionWithDiarization(
  deepgramResponse: DeepgramResponse
): string {
  const speakerSegments: SpeakerSegment[] = [];

  deepgramResponse.results.channels.forEach((channel) => {
    channel.alternatives.forEach((alternative) => {
      alternative.paragraphs.forEach((paragraph) => {
        const speakerText: string = paragraph.sentences
          .map((sentence) => sentence.text)
          .join(" ");
        speakerSegments.push({
          speaker: paragraph.speaker,
          text: speakerText,
        });
      });
    });
  });

  // Format the output to include speaker labels
  const formattedTranscript = speakerSegments
    .map((segment) => `Speaker ${segment.speaker}: ${segment.text}`)
    .join("\n");

  return formattedTranscript;
}
