import {
  FcVoicemail,
  FcHome,
  FcCalendar,
  FcSerialTasks,
  FcFilledFilter,
} from "react-icons/fc";

export default function SideNav() {
  return (
    <>
      <div className="w-[100px] border-r text-3xl space-y-6 flex flex-col items-center pt-6">
        <div className="p-2 border border-1 rounded-lg">
          <FcHome />
        </div>
        <div className="p-2 border border-1 rounded-lg">
          <FcCalendar />
        </div>
        <div className="p-2 border border-1 rounded-lg">
          <FcVoicemail />
        </div>
        <div className="p-2 border border-1 rounded-lg">
          <FcSerialTasks />
        </div>
        <div className="p-2 border border-1 rounded-lg">
          <FcFilledFilter />
        </div>
      </div>
    </>
  );
}
