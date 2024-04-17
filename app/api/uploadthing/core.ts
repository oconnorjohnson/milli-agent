import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { createRecording } from "@/server/db/create";
import { currentUser } from "@clerk/nextjs";

const f = createUploadthing();
const auth = async () => {
  const user = await currentUser();
  return user;
};
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  audioUploader: f({ audio: { maxFileSize: "1GB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ files, input }) => {
      const user = await auth();
      if (!user) throw new Error("Unauthorized");
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      const recording = await createRecording({
        url: file.url,
      });
      console.log(recording);
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
