"use client";

import { DataTableColumnHeader } from "@/components/dashboard/users/data-table-column-header";
import { DataTableRowActions } from "@/components/dashboard/users/data-table-row-action";
import { UsersProps } from "@/lib/validator/dashboard/users/api";
import { Checkbox } from "@/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UsersProps>[] = [
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
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Lengkap" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "lastSignInAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Terakhir Login" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
