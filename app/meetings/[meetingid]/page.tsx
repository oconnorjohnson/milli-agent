import {
  getTranscriptionByMeetingId,
  getAnalysisChunksByMeetingId,
} from "@/server/db/read";
import type { DeepgramResponse } from "@/types/deepgram_types";
import Chat from "@/components/meetings/chat-with-script";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChunkScriptButton,
  ChunkTopicsButton,
  AnalyzeChunksButton,
} from "@/components/meetings/analyze-script";
import { ScrollArea } from "@/components/ui/scroll-area";
import TranscriptScroll from "@/components/meetings/transcript-scroll";
import PopoutAnalysisCard from "@/components/meetings/popout-analysis-card";
import { Tables } from "@/types/db_types";

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
  const analysisChunks = await getAnalysisChunksByMeetingId({
    MeetingId: MeetingId,
  });
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-1/2">
          <ChunkScriptButton MeetingId={MeetingId} />
          <ChunkTopicsButton MeetingId={MeetingId} />
          <AnalyzeChunksButton MeetingId={MeetingId} />
          {/* @ts-ignore */}
          <TranscriptScroll transcript={transcription} />
        </div>
        <div className="px-2" />
        <div className="w-1/2">
          <div className="relative">
            {" "}
            {/* This container is relative */}
            {/* Position PopoutAnalysisCard absolutely within the relative container */}
            <div className="absolute top-2 right-8 z-10">
              <PopoutAnalysisCard analysisChunks={analysisChunks} />
            </div>
            {/* ScrollArea with a specific z-index */}
            <ScrollArea className="z-0 w-[220px] h-[550px] md:w-[500px] md:h-[750px] overflow-hidden">
              {/* Summarizer */}
              <Card className=" w-full h-full mb-4 ">
                <CardHeader>
                  <CardTitle>Summaries</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>Card Footer</CardFooter>
              </Card>
              {/* Theme Tracker */}
              <Card className=" w-full h-full my-4 ">
                <CardHeader>
                  <CardTitle>Themes</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>Card Footer</CardFooter>
              </Card>
              {/* Idea Tracker */}
              <Card className=" w-full h-full my-4 ">
                <CardHeader>
                  <CardTitle>Ideas</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>Card Footer</CardFooter>
              </Card>
              {/* Sentiment Tracker */}
              <Card className=" w-full h-full my-4 ">
                <CardHeader>
                  <CardTitle>Sentiments</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>Card Footer</CardFooter>
              </Card>
              {/* Decision Tracker */}
              <Card className=" w-full h-full mt-4 ">
                <CardHeader>
                  <CardTitle>Decisions</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>Card Footer</CardFooter>
              </Card>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
