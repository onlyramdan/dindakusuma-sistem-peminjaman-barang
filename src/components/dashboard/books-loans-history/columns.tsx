"use client";

import { DataTableColumnHeader } from "@/components/dashboard/books-loans-history/data-table-column-header";
import { BooksLoansHistoryProps } from "@/lib/validator/dashboard/books-loans-history/api";
import { Checkbox } from "@/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BooksLoansHistoryProps>[] = [
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
      <DataTableColumnHeader column={column} title="Judul Buku" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "jumlah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah" />
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
