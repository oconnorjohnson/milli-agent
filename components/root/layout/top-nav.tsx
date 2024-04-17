"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 flex h-16 items-center  gap-4 border-b bg-background md:px-6 opacity-95 ">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className={`flex items-center gap-2 text-lg font-semibold `}
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/dashboard"
          className={`text-muted-foreground transition-colors ${
            pathname === "/dashboard" ? "text-white" : "text-muted-foreground"
          } hover:text-foreground`}
        >
          Dashboard
        </Link>
        <Link
          href="/meetings"
          className={`text-muted-foreground transition-colors ${
            pathname.startsWith("/meetings")
              ? "text-white"
              : "text-muted-foreground"
          } hover:text-foreground`}
        >
          Meetings
        </Link>
        <Link
          href="/characters"
          className={`text-muted-foreground transition-colors ${
            pathname === "/characters" ? "text-white" : "text-muted-foreground"
          } hover:text-foreground`}
        >
          Characters
        </Link>
        <Link
          href="/timelines"
          className={`text-muted-foreground transition-colors ${
            pathname === "/timelines" ? "text-white" : "text-muted-foreground"
          } hover:text-foreground`}
        >
          Timelines
        </Link>
        <Link
          href="/world"
          className={`text-muted-foreground transition-colors ${
            pathname === "/world" ? "text-white" : "text-muted-foreground"
          } hover:text-foreground`}
        >
          World
        </Link>
      </nav>
      <div className="">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className={`text-muted-foreground transition-colors ${
                  pathname === "/" ? "text-white" : "text-muted-foreground"
                } hover:text-foreground`}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className={`text-muted-foreground transition-colors ${
                  pathname === "/dashboard"
                    ? "text-white"
                    : "text-muted-foreground"
                } hover:text-foreground`}
              >
                Dashboard
              </Link>
              <Link
                href="/meetings"
                className={`text-muted-foreground transition-colors ${
                  pathname === "/meetings"
                    ? "text-white"
                    : "text-muted-foreground"
                } hover:text-foreground`}
              >
                Meetings
              </Link>
              <Link
                href="/meetings/summaries"
                className={`text-muted-foreground transition-colors ${
                  pathname === "/meetings/summaries"
                    ? "text-white"
                    : "text-muted-foreground"
                } hover:text-foreground`}
              >
                Summaries
              </Link>
              <Link
                href="/meetings/transcriptions"
                className={`text-muted-foreground transition-colors ${
                  pathname === "/meetings/transcriptions"
                    ? "text-white"
                    : "text-muted-foreground"
                } hover:text-foreground`}
              >
                Transcriptions
              </Link>
              <Link
                href="/meetings/recordings"
                className={`text-muted-foreground transition-colors ${
                  pathname === "/meetings/recordings"
                    ? "text-white"
                    : "text-muted-foreground"
                } hover:text-foreground`}
              >
                Recordings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <SignOutButton>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
