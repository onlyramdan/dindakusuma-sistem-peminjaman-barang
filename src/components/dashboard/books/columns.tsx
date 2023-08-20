"use client";

import { DataTableColumnHeader } from "@/components/dashboard/books/data-table-column-header";
import { DataTableRowActions } from "@/components/dashboard/books/data-table-row-action";
import { BooksProps } from "@/lib/validator/dashboard/books/api";
import { Checkbox } from "@/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BooksProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "judul",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Judul" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "penulis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Penulis" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "penerbit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Penerbit" />
    ),
  },
  {
    accessorKey: "tahun",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun Terbit" />
    ),
  },
  {
    accessorKey: "stok",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stok" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
