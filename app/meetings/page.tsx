import ExampleUploader from "@/components/examples/example-uploader";
import NewMeetingForm from "@/components/meetings/new-meeting-dialog";
export default async function Meetings() {
  return (
    <>
      <div className="font-bold text-2xl min-h-screen">
        <div className="font-bold text-2xl min-h-screen">
          <NewMeetingForm />
        </div>
      </div>
    </>
  );
}
