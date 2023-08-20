"use client";

import DeleteButton from "@/components/dashboard/books/delete-button";
import { cn } from "@/lib/utils";
import { showBooksProps } from "@/lib/validator/dashboard/books/api";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const books = showBooksProps.parse(row.original);
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild onClick={() => setOpen(!open)}>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuGroup onClick={() => setOpen(true)}>
          <Link href={`/dashboard/books/edit/${books.id}`}>
            <DropdownMenuItem className={cn("hover:cursor-pointer")}>
              Edit
            </DropdownMenuItem>
          </Link>
          <DeleteButton id={books.id} judul={books.judul} setOpen={setOpen} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
