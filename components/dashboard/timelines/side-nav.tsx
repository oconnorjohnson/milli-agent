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
              href="/timelines"
              className={`w-full ${
                pathname === "/timelines"
                  ? "text-foreground"
                  : "text-muted-foreground font-medium"
              }`}
            >
              All
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/timelines/backstory"
              className={`w-full ${
                pathname === "/timelines/backstory"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Backstory
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/timelines/season-one"
              className={`w-full ${
                pathname === "/timelines/season-one"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Season 1
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/timelines/season-two"
              className={`w-full ${
                pathname === "/timelines/season-two"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Season 2
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
