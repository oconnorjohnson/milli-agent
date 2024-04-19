"use client";
import { Button } from "@/components/ui/button";
import { chunkTranscript } from "@/server/actions/transcripts/chunker";

export default function AnalyzeScript({ MeetingId }: { MeetingId: number }) {
  async function onClick() {
    const chunkedTranscript = await chunkTranscript({ MeetingId: MeetingId });
    console.log("clicked");
    console.log(chunkedTranscript);
  }
  return (
    <>
      <Button
        type="button"
        onClick={onClick}
        variant="outline"
        className="mb-4"
      >
        Analyze Transcript
      </Button>
    </>
  );
}
