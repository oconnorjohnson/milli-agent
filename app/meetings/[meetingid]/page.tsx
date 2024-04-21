import { getTranscriptionByMeetingId } from "@/server/db/read";
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
          <ScrollArea className="w-[220px] h-[550px] md:w-[500px] md:h-[700px] overflow-hidden ">
            <Card className="w-full h-full my-4 ">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
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
  );
}
