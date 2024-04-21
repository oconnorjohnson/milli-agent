"use client";
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import type { DeepgramResponse } from "@/types/deepgram_types";

export default function TranscriptScroll({
  transcript,
}: {
  transcript: DeepgramResponse;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const scrollAreaRef = useRef(null);
  const paragraphRefs = useRef([]);
  const formattedTranscript = formatTranscript(transcript);
  useEffect(() => {
    // Whenever the search term changes, scroll to the first highlighted paragraph
    if (searchTerm.trim() && paragraphRefs.current.length) {
      const firstMatchIndex = formattedTranscript.findIndex((paragraph) =>
        paragraph.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (firstMatchIndex !== -1) {
        // @ts-ignore
        paragraphRefs.current[firstMatchIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [searchTerm, formattedTranscript]);
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    // integrate serach logic here
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="py-2" />
      <ScrollArea
        ref={scrollAreaRef}
        className="w-[220px] h-[550px] md:w-full md:h-[650px] overflow-hidden"
      >
        <div className="flex flex-col gap-4">
          {formattedTranscript.map((paragraph, index) => (
            <p
              key={index}
              className="mb-4"
              // @ts-ignore
              ref={(el) => (paragraphRefs.current[index] = el)} // Assign ref to each paragraph
            >
              <span className="font-bold text-lg pr-2">
                {paragraph.speaker}:
              </span>
              {highlightSearchTerm(paragraph.text, searchTerm)}
            </p>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

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

function highlightSearchTerm(text: string, searchTerm: string): JSX.Element {
  if (!searchTerm.trim()) {
    return <span>{text}</span>;
  }
  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={index} className="bg-yellow-200">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}
