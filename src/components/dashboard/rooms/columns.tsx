"use client";

import { DataTableColumnHeader } from "@/components/dashboard/rooms/data-table-column-header";
import { DataTableRowActions } from "@/components/dashboard/rooms/data-table-row-action";
import { Checkbox } from "@/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Ruangan" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "tersedia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ketersediaan Ruangan" />
    ),
    cell: ({ row }) => (
      <div>{row.original.tersedia === true ? "Tersedia" : "Dipinjam"}</div>
    ),
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
