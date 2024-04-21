import MeetingsTable from "@/components/meetings/tables/meetings/page";
import NewMeetingForm from "@/components/meetings/new-meeting-dialog";
import { Suspense } from "react";

export default async function Meetings() {
  return (
    <>
      <div className="font-bold text-2xl min-h-screen">
        <div className="font-bold text-2xl min-h-screen">
          <NewMeetingForm />
          <div className="py-4" />

          <MeetingsTable />
        </div>
      </div>
    </>
  );
}

export const runtime = "edge";
