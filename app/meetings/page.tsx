import ExampleUploader from "@/components/examples/example-uploader";
export default async function Meetings() {
  return (
    <>
      <div className="font-bold text-2xl min-h-screen">
        Hello from Meetings
        <ExampleUploader />
        <div className="font-bold text-2xl min-h-screen"></div>
      </div>
    </>
  );
}
