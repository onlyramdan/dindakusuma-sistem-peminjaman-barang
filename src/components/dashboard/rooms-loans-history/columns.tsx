"use client";

import { DataTableColumnHeader } from "@/components/dashboard/rooms-loans-history/data-table-column-header";
import { RoomsLoansHistoryProps } from "@/lib/validator/dashboard/rooms-loans-history/api";
import { Checkbox } from "@/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RoomsLoansHistoryProps>[] = [
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
    accessorKey: "namaRuangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Ruangan" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "tanggalPinjam",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Pinjam" />
    ),
  },
  {
    accessorKey: "tanggalKembali",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Kembali" />
    ),
  },
  {
    accessorKey: "namaPeminjam",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Peminjam" />
    ),
    enableHiding: false,
  },
];
