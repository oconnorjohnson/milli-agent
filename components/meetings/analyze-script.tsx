"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { chunkTranscript } from "@/server/actions/transcripts/chunker";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AnalyzeScript({ MeetingId }: { MeetingId: number }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onClick() {
    setIsSubmitting(true);
    try {
      const chunkedTranscript = await chunkTranscript({ MeetingId: MeetingId });
      console.log("clicked");
      console.log(chunkedTranscript);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      {isSubmitting ? (
        <Button disabled type="button" variant="outline" className="mb-4">
          Analyzing
          <LoadingSpinner className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onClick}
          variant="outline"
          className="mb-4"
        >
          Analyze Transcript
        </Button>
      )}
    </>
  );
}
