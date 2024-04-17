import {
  Meeting,
  columns,
} from "@/components/meetings/tables/meetings/columns";
import { DataTable } from "@/components/ui/data-table";
import { getMeetings as getMeetingsFromDb } from "@/server/db/read";

async function getMeetings(): Promise<Meeting[]> {
  const meetings = await getMeetingsFromDb();
  const modifiedMeetings = meetings.map((meeting) => {
    return {
      ...meeting,
      date: new Date(meeting.date),
      title: meeting.title,
      description: meeting.description,
      actions: meeting.id,
    };
  });
  return modifiedMeetings;
}

export default async function Meetings() {
  const meetings = await getMeetings();
  return (
    <>
      <div className="font-bold text-2xl">
        <div className="font-bold text-2xl">Meetings</div>
      </div>
      <DataTable columns={columns} data={meetings} />
    </>
  );
}
