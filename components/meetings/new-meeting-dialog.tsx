import NewMeetingForm from "@/components/meetings/forms/new-meeting";
import { PlusIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NewMeetingDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Toggle calendar</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <NewMeetingForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
