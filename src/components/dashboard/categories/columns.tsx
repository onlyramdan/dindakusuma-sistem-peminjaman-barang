"use client";

import { DataTableColumnHeader } from "@/components/dashboard/categories/data-table-column-header";
import { DataTableRowActions } from "@/components/dashboard/categories/data-table-row-action";
import { CategoriesProps } from "@/lib/validator/dashboard/categories/api";
import { Checkbox } from "@/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CategoriesProps>[] = [
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
      <DataTableColumnHeader column={column} title="Nama Kategori" />
    ),
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
