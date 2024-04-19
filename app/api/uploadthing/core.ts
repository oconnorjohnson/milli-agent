import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";
import { updateMeeting } from "@/server/db/update";
import { z } from "zod";
import { TranscribeMeeting } from "@/server/transcription/transcribe";
const f = createUploadthing();
const auth = async () => {
  const user = await currentUser();
  return user;
};
const uploadMeetingRecording = z.object({
  id: z.number(),
});
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  audioUploader: f({ audio: { maxFileSize: "1GB" } })
    // Set permissions and file types for this FileRoute
    .input(uploadMeetingRecording)
    .middleware(async ({ files, input }) => {
      const user = await auth();
      if (!user) throw new Error("Unauthorized");
      return { userId: user?.id, id: input.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete with meeting id input as:", metadata.id);
      const recordingId = await updateMeeting({
        id: metadata.id,
        recordingUrl: file.url,
      });
      if (recordingId) {
        await TranscribeMeeting({ URL: file.url, MeetingId: metadata.id });
      } else {
        console.log("recordingId is null");
      }
      revalidatePath(`/meetings`);
      revalidatePath(`/meetings/[meetingid]`);
      console.log(recordingId);
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, RecordingId: recordingId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
