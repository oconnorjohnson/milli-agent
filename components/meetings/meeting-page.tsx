"use client";

import type { Json } from "@/types/db_types";
import type { DeepgramResponse } from "@/types/deepgram_types";

export default function MeetingPage({ text }: { text: Json }) {
  console.log("called MeetingPage with text: ", text);
  const string = JSON.stringify(text);
  return <div>{string}</div>;
}
