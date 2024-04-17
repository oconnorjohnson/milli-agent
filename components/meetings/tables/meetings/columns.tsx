"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Meeting = {
  id: number;
  date: Date;
  title: string;
  description: string;
  recordingUrl: string | null;
  TranscriptionId: number | null;
  SummaryId: number | null;
};

export const columns: ColumnDef<Meeting>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Meeting Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date;
      return (
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{date.toLocaleDateString()}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => column.toggleSorting()}
        >
          Title
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{title}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => column.toggleSorting()}
        >
          Description
        </Button>
      );
    },
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{description}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const meeting = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/meetings/${meeting.id}`}>
              <DropdownMenuItem>View Transcript</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />

            {/* 
            add function to dropdown menu item like:
            onClick={() => navigator.clipboard.writeText(payment.id)}
             */}
            {/* <DropdownMenuItem className="bg-green-600 text-white">
              Approve
            </DropdownMenuItem>
            <div className="py-0.5" />
            <DropdownMenuItem className="bg-red-600 text-white">
              Deny
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
