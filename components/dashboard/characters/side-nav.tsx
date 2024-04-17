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
              href="/characters"
              className={`w-full ${
                pathname === "/characters"
                  ? "text-foreground"
                  : "text-muted-foreground font-medium"
              }`}
            >
              All
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/characters/main"
              className={`w-full ${
                pathname === "/characters/main"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Main
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/characters/side"
              className={`w-full ${
                pathname === "/characters/side"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Side
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/characters/extras"
              className={`w-full ${
                pathname === "/characters/extras"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Extras
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
