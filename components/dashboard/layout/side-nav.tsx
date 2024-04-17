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
              href="/dashboard"
              className={`w-full ${
                pathname === "/dashboard"
                  ? "text-foreground"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Dashboard
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/dashboard/to-do"
              className={`w-full ${
                pathname === "/dashboard/to-do"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              To-Do
            </Link>
          </div>
          <div className="px-3 md:px-6">
            <Link
              href="/dashboard/settings"
              className={`w-full ${
                pathname === "/dashboard/settings"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground font-medium"
              }`}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
