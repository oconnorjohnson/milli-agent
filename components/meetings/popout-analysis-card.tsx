import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExpandIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface AnalysisChunk {
  created_at: string;
  decisionTracker: string | null;
  id: number;
  ideaTracker: string | null;
  MeetingId: number | null;
  sentimentTracker: string | null;
  summarizer: string | null;
  themeTracker: string | null;
}

export default function PopoutAnalysisCard({
  analysisChunks,
}: {
  analysisChunks: AnalysisChunk[];
}) {
  return (
    <div className="z-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            type="button"
            size="icon"
            className="rounded-md"
          >
            <ExpandIcon className="h-5 w-5" />
            <span className="sr-only">Open Full Screen Summary</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <ScrollArea className="z-0  h-[550px]  md:h-[750px] overflow-hidden">
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
