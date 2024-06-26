"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function SideNav() {
  const pathname = usePathname();
  return (
    <>
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="text-xs md:text-xl w-[100px] md:w-[150px] h-screen border-r space-y-2 flex flex-col items-start pt-3 md:pt-4 ">
          <div className="px-3 md:px-6">
            <Link
              href="/meetings"
              className={`w-full ${
                pathname === "/meetings"
                  ? "text-foreground"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Meetings
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/meetings/summaries"
              className={`w-full ${
                pathname === "/meetings/summaries"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Summaries
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/meetings/transcriptions"
              className={`w-full ${
                pathname === "/meetings/transcriptions"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Transcripts
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/meetings/recordings"
              className={`w-full ${
                pathname === "/meetings/recordings"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Recordings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
