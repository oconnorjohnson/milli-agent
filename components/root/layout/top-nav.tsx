"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
    <div className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
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
            pathname === "/meetings" ? "text-white" : "text-muted-foreground"
          } hover:text-foreground`}
        >
          Meetings
        </Link>
        <Link
          href="/summaries"
          className={`text-muted-foreground transition-colors ${
            pathname === "/summaries" ? "text-white" : "text-muted-foreground"
          } hover:text-foreground`}
        >
          Summaries
        </Link>
        <Link
          href="/transcriptions"
          className={`text-muted-foreground transition-colors ${
            pathname === "/transcriptions"
              ? "text-white"
              : "text-muted-foreground"
          } hover:text-foreground`}
        >
          Transcriptions
        </Link>
        <Link
          href="/recordings"
          className={`text-muted-foreground transition-colors ${
            pathname === "/recordings" ? "text-white" : "text-muted-foreground"
          } hover:text-foreground`}
        >
          Recordings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className={`flex items-center gap-2 text-lg font-semibold `}
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
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
              href="/summaries"
              className={`text-muted-foreground transition-colors ${
                pathname === "/summaries"
                  ? "text-white"
                  : "text-muted-foreground"
              } hover:text-foreground`}
            >
              Summaries
            </Link>
            <Link
              href="/transcriptions"
              className={`text-muted-foreground transition-colors ${
                pathname === "/transcriptions"
                  ? "text-white"
                  : "text-muted-foreground"
              } hover:text-foreground`}
            >
              Transcriptions
            </Link>
            <Link
              href="/recordings"
              className={`text-muted-foreground transition-colors ${
                pathname === "/recordings"
                  ? "text-white"
                  : "text-muted-foreground"
              } hover:text-foreground`}
            >
              Recordings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
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
