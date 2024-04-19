"use client";
import { Button } from "@/components/ui/button";

async function onClick() {
  console.log("clicked");
}

export default function AnalyzeScript() {
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
