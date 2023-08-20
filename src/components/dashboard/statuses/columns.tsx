"use client";

import { DataTableColumnHeader } from "@/components/dashboard/statuses/data-table-column-header";
import { DataTableRowActions } from "@/components/dashboard/statuses/data-table-row-action";
import { StatusesProps } from "@/lib/validator/dashboard/statuses/api";
import { Checkbox } from "@/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StatusesProps>[] = [
    {
        id: "select",
        header: ({ table }: any) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }: any) => (
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
        accessorKey: "keterangan",
        header: ({ column }: any) => (
            <DataTableColumnHeader column={column} title="Keterangan" />
        ),
        enableHiding: false,
    },
    {
        id: "actions",
        cell: ({ row }: any) => <DataTableRowActions row={row} />,
    },
];
