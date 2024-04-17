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
              href="/world"
              className={`w-full ${
                pathname === "/world"
                  ? "text-foreground"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Overview
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/locations"
              className={`w-full ${
                pathname === "/world/locations"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Locations
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/sets"
              className={`w-full ${
                pathname === "/world/sets"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Sets
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/cultures"
              className={`w-full ${
                pathname === "/world/cultures"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Cultures
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/classes"
              className={`w-full ${
                pathname === "/world/classes"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Classes
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/technology"
              className={`w-full ${
                pathname === "/world/technology"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Technology
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/economy"
              className={`w-full ${
                pathname === "/world/economy"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Economy
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/government"
              className={`w-full ${
                pathname === "/world/government"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Government
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/vice"
              className={`w-full ${
                pathname === "/world/vice"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Vice
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/world/crime"
              className={`w-full ${
                pathname === "/world/crime"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Crime
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
