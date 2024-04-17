"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import NewMeetingForm from "@/components/meetings/forms/new-meeting";
import { PlusIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import { createMeeting } from "@/server/db/create";
import { updateMeeting } from "@/server/db/update";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  title: z.string({ required_error: "A title is required." }),
  description: z.string({ required_error: "A description is required." }),
});
interface ClientUploadedFileData<T = any> {
  uploadedBy: string;
  RecordingId: number;
  // other properties...
}
export default function NewMeetingDialog() {
  const [meeting, setMeeting] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("tab1");
  const [progress, setProgress] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    switch (activeTab) {
      case "tab1":
        setProgress(0);
        break;
      case "tab2":
        setProgress(25);
        break;
      case "tab3":
        setProgress(60);
        break;
      case "tab4":
        setProgress(95);
        break;
      case "tab5":
        setProgress(100);
        break;
      default:
        setProgress(0);
    }
  }, [activeTab]);

  const goToNextTab = () => {
    let currentTabIndex = parseInt(activeTab.substring(3));
    if (currentTabIndex < 5) {
      const nextTab = `tab${currentTabIndex + 1}`;
      setActiveTab(nextTab);
    }
  };

  const goToLastTab = () => {
    if (activeTab !== "tab") {
      const lastTab = `tab${parseInt(activeTab[3]) - 1}`;
      setActiveTab(lastTab);
    }
  };

  const goToFirstTab = () => {
    if (activeTab !== "tab1") {
      const firstTab = `tab1`;
      setActiveTab(firstTab);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const createdMeetingId = await createMeeting({
        title: data.title,
        date: data.date.toISOString(),
        description: data.description,
      });
      if (createdMeetingId) {
        setMeeting(createdMeetingId); // Update the meeting state variable
        toast.success("Meeting created");
      } else {
        toast.error("Meeting creation failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      goToNextTab();
    }
  }

  const dialogDone = () => {
    setTimeout(() => {
      goToFirstTab();
      form.reset();
    }, 500);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            type="button"
            className="rounded-full"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Toggle calendar</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="tab1"
            className="pt-1 px-2"
          >
            <TabsContent value="tab1" hidden={activeTab !== "tab1"}>
              <Card>
                <CardHeader>
                  <CardTitle>New Meeting</CardTitle>
                  <CardDescription>
                    Add a new meeting record to upload a recording.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              A title is required.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    type="button"
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Date of meeting is required.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              A description is required.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Save Details</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2" hidden={activeTab !== "tab2"}>
              <Card>
                <CardHeader>
                  <CardTitle>Upload Recording</CardTitle>
                  <CardDescription>
                    Upload a .mp3 recording of the meeting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {meeting && (
                    <UploadButton
                      endpoint="audioUploader"
                      input={{ id: meeting }}
                      onClientUploadComplete={(res) => {
                        // Assuming res always contains exactly one object
                        console.log(res);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  )}
                </CardContent>
              </Card>
              <div className="py-2" />
              <DialogClose onClick={dialogDone}>
                <Button type="button">Done</Button>
              </DialogClose>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
