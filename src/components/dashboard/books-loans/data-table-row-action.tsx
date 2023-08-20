/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DetailButton from "@/components/dashboard/books-loans/detail-button";
import EditButton from "@/components/dashboard/books-loans/edit-button";
import { batalkanBooksLoans } from "@/helpers/dashboard/books-loans/batalkan-books-loans";
import { deleteBooksLoans } from "@/helpers/dashboard/books-loans/delete-books-loans";
import { kembalikanBooksLoans } from "@/helpers/dashboard/books-loans/kembalikan-books-loans";
import { updateDiterimaBooksLoans } from "@/helpers/dashboard/books-loans/update-diterima-books-loans";
import { updateDitolakBooksLoans } from "@/helpers/dashboard/books-loans/update-ditolak-books-loans";
import { updatePendingBooksLoans } from "@/helpers/dashboard/books-loans/update-pending-books-loans";
import { cn } from "@/lib/utils";
import { createResponseBooksLoansProps } from "@/lib/validator/dashboard/book-loans/api";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { useToast } from "@/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { user } = useUser();
  const role = user?.publicMetadata.role;
  const booksLoans = createResponseBooksLoansProps.parse(row.original);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const {
    isSuccess: isUpdatePendingStatusSuccess,
    mutate: updatePendingStatus,
    isLoading: isUpdatePendingStatusLoading,
    isError: isUpdatePendingStatusError,
  } = updatePendingBooksLoans();
  const {
    isSuccess: isUpdateDiterimaStatusSuccess,
    mutate: updateDiterimaStatus,
    isLoading: isUpdateDiterimaStatusLoading,
    isError: isUpdateDiterimaStatusError,
  } = updateDiterimaBooksLoans();
  const {
    isSuccess: isUpdateDitolakStatusSuccess,
    mutate: updateDitolakStatus,
    isLoading: isUpdateDitolakStatusLoading,
    isError: isUpdateDitolakStatusError,
  } = updateDitolakBooksLoans();
  const {
    isSuccess: isBatalkanBooksLoansSuccess,
    mutate: batalkanBooksLoansById,
    isLoading: isBatalkanBooksLoansLoading,
    isError: isBatalkanBooksLoansError,
  } = batalkanBooksLoans();
  const {
    isSuccess: isKembalikanBooksLoansSuccess,
    mutate: kembalikanBooksLoansById,
    isLoading: isKembalikanBooksLoansLoading,
    isError: isKembalikanBooksLoansError,
  } = kembalikanBooksLoans();
  const {
    isSuccess: isDeleteBooksLoansSuccess,
    mutate: deleteBooksLoansById,
    isLoading: isDeleteBooksLoansLoading,
    isError: isDeleteBooksLoansError,
  } = deleteBooksLoans();

  const handleUpdatePendingStatus = () => {
    updatePendingStatus({
      id: booksLoans.id,
    });
  };

  const handleUpdateDiterimaStatus = () => {
    updateDiterimaStatus({
      id: booksLoans.id,
    });
  };

  const handleUpdateDitolakStatus = () => {
    updateDitolakStatus({
      id: booksLoans.id,
    });
  };

  const handleBatalkanBooksLoans = () => {
    batalkanBooksLoansById({
      id: booksLoans.id,
    });
  };

  const handleKembalikanBooksLoans = () => {
    kembalikanBooksLoansById({
      id: booksLoans.id,
    });
  };

  const handleDeleteBooksLoans = () => {
    deleteBooksLoansById({
      id: booksLoans.id,
    });
  };

  useEffect(() => {
    if (isUpdatePendingStatusSuccess) {
      toast({
        title: "Success",
        description: "Status peminjaman buku telah diubah menjadi direview.",
      });
      setOpen(false);
    }

    if (isUpdatePendingStatusError) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Terjadi kesalahan saat memperbarui status peminjaman buku.",
      });
    }
  }, [isUpdatePendingStatusSuccess, isUpdatePendingStatusError]);

  useEffect(() => {
    if (isUpdateDiterimaStatusSuccess) {
      toast({
        title: "Success",
        description: "Status peminjaman buku telah diubah menjadi diterima.",
      });
      setOpen(false);
    }

    if (isUpdateDiterimaStatusError) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Terjadi kesalahan saat memperbarui status peminjaman buku.",
      });
    }
  }, [isUpdateDiterimaStatusSuccess, isUpdateDiterimaStatusError]);

  useEffect(() => {
    if (isBatalkanBooksLoansSuccess) {
      toast({
        title: "Success",
        description: "Pembatalan peminjaman buku berhasil.",
      });
      setOpen(false);
    }

    if (isBatalkanBooksLoansError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat membatalkan peminjaman buku.",
      });
    }
  }, [isBatalkanBooksLoansSuccess, isBatalkanBooksLoansError]);

  useEffect(() => {
    if (isKembalikanBooksLoansSuccess) {
      toast({
        title: "Success",
        description: "Pengembalian peminjaman buku berhasil.",
      });
      setOpen(false);
    }

    if (isKembalikanBooksLoansError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengembalikan peminjaman buku.",
      });
    }
  }, [isKembalikanBooksLoansSuccess, isKembalikanBooksLoansError]);

  useEffect(() => {
    if (isDeleteBooksLoansSuccess) {
      toast({
        title: "Success",
        description: "Penghapusan peminjaman buku berhasil.",
      });
      setOpen(false);
    }

    if (isDeleteBooksLoansError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menghapus peminjaman buku.",
      });
    }
  }, [isDeleteBooksLoansSuccess, isDeleteBooksLoansError]);

  useEffect(() => {
    if (isUpdateDitolakStatusSuccess) {
      toast({
        title: "Success",
        description: "Status peminjaman buku telah diubah menjadi ditolak.",
      });
      setOpen(false);
    }

    if (isUpdateDitolakStatusError) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Terjadi kesalahan saat memperbarui status peminjaman buku.",
      });
    }
  }, [isUpdateDitolakStatusSuccess, isUpdateDitolakStatusError]);

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
          <DetailButton id={booksLoans.id} />
          {role === "admin" && (
            <>
              {booksLoans.status === "Pending" && (
                <DropdownMenuItem
                  className={cn("hover:cursor-pointer")}
                  onClick={() => handleUpdatePendingStatus()}
                >
                  {isUpdatePendingStatusLoading && (
                    <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                  )}
                  Reviewing
                </DropdownMenuItem>
              )}
              {booksLoans.status === "Direview" && (
                <>
                  <DropdownMenuItem
                    className={cn("hover:cursor-pointer")}
                    onClick={() => handleUpdateDiterimaStatus()}
                  >
                    {isUpdateDiterimaStatusLoading && (
                      <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                    )}
                    Terima
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn("hover:cursor-pointer")}
                    onClick={() => handleUpdateDitolakStatus()}
                  >
                    {isUpdateDitolakStatusLoading && (
                      <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                    )}
                    Tolak
                  </DropdownMenuItem>
                </>
              )}
              {(booksLoans.status === "Diterima" ||
                booksLoans.status === "Ditolak") &&
                null}
              <DropdownMenuItem
                className={cn("hover:cursor-pointer")}
                onClick={() => handleDeleteBooksLoans()}
              >
                {isDeleteBooksLoansLoading && (
                  <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                )}
                Delete
              </DropdownMenuItem>
            </>
          )}
          {(!role || role !== "admin") && (
            <>
              {booksLoans.status === "Pending" && (
                <>
                  <EditButton id={booksLoans.id} />
                  <DropdownMenuItem
                    className={cn("hover:cursor-pointer")}
                    onClick={() => handleBatalkanBooksLoans()}
                  >
                    {isBatalkanBooksLoansLoading && (
                      <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                    )}
                    Batalkan
                  </DropdownMenuItem>
                </>
              )}
              {booksLoans.status === "Direview" && null}
              {booksLoans.status === "Diterima" && (
                <DropdownMenuItem
                  className={cn("hover:cursor-pointer")}
                  onClick={() => handleKembalikanBooksLoans()}
                >
                  {isKembalikanBooksLoansLoading && (
                    <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                  )}
                  Kembalikan
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
