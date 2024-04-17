"use client";

import { UploadButton } from "@/lib/uploadthing";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pt-12 pb-8">
      <UploadButton
        endpoint="audioUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
