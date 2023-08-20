/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DetailButton from "@/components/dashboard/rooms-loans/detail-button";
import { batalkanRoomsLoans } from "@/helpers/dashboard/rooms-loans/batalkan-rooms-loans";
import { kembalikanRoomsLoans } from "@/helpers/dashboard/rooms-loans/kembalikan-rooms-loans";
import { updateDiterimaRoomsLoans } from "@/helpers/dashboard/rooms-loans/update-diterima-rooms-loans";
import { updateDitolakRoomsLoans } from "@/helpers/dashboard/rooms-loans/update-ditolak-rooms-loans";
import { updatePendingStatusRoomsLoans } from "@/helpers/dashboard/rooms-loans/update-pending-rooms-loans";
import { cn } from "@/lib/utils";
import { createGetResponseRoomsLoansProps } from "@/lib/validator/dashboard/rooms-loans/api";
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
import EditButton from "./edit-button";
import { deleteRoomsLoans } from "@/helpers/dashboard/rooms-loans/delete-rooms-loans";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { user } = useUser();
  const role = user?.publicMetadata.role;
  const roomsLoans = createGetResponseRoomsLoansProps.parse(row.original);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const {
    isSuccess: isUpdatePendingStatusSuccess,
    mutate: updatePendingStatus,
    isLoading: isUpdatePendingStatusLoading,
    isError: isUpdatePendingStatusError,
  } = updatePendingStatusRoomsLoans();
  const {
    isSuccess: isUpdateDiterimaStatusSuccess,
    mutate: updateDiterimaStatus,
    isLoading: isUpdateDiterimaStatusLoading,
    isError: isUpdateDiterimaStatusError,
  } = updateDiterimaRoomsLoans();
  const {
    isSuccess: isUpdateDitolakStatusSuccess,
    mutate: updateDitolakStatus,
    isLoading: isUpdateDitolakStatusLoading,
    isError: isUpdateDitolakStatusError,
  } = updateDitolakRoomsLoans();
  const {
    isSuccess: isBatalkanRoomsLoansSuccess,
    mutate: batalkanRoomsLoansById,
    isLoading: isBatalkanRoomsLoansLoading,
    isError: isBatalkanRoomsLoansError,
  } = batalkanRoomsLoans();
  const {
    isSuccess: isKembalikanRoomsLoansSuccess,
    mutate: kembalikanRoomsLoansById,
    isLoading: isKembalikanRoomsLoansLoading,
    isError: isKembalikanRoomsLoansError,
  } = kembalikanRoomsLoans();
  const {
    isSuccess: isDeleteRoomsLoansSuccess,
    mutate: deleteRoomsLoansById,
    isLoading: isDeleteRoomsLoansLoading,
    isError: isDeleteRoomsLoansError,
  } = deleteRoomsLoans();

  const handleUpdatePendingStatus = () => {
    updatePendingStatus({
      id: roomsLoans.id,
    });
  };

  const handleUpdateDiterimaStatus = () => {
    updateDiterimaStatus({
      id: roomsLoans.id,
    });
  };

  const handleUpdateDitolakStatus = () => {
    updateDitolakStatus({
      id: roomsLoans.id,
    });
  };

  const handleBatalkanRoomsLoans = () => {
    batalkanRoomsLoansById({
      id: roomsLoans.id,
    });
  };

  const handleKembalikanRoomsLoans = () => {
    kembalikanRoomsLoansById({
      id: roomsLoans.id,
    });
  };

  const handleDeleteRoomsLoans = () => {
    deleteRoomsLoansById({
      id: roomsLoans.id,
    });
  };

  useEffect(() => {
    if (isUpdatePendingStatusSuccess) {
      toast({
        title: "Success",
        description: "Status peminjaman ruangan telah diubah menjadi direview.",
      });
    }

    if (isUpdatePendingStatusError) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Terjadi kesalahan saat memperbarui status peminjaman ruangan.",
      });
    }
  }, [isUpdatePendingStatusSuccess, isUpdatePendingStatusError]);

  useEffect(() => {
    if (isUpdateDiterimaStatusSuccess) {
      toast({
        title: "Success",
        description: "Status peminjaman ruangan telah diubah menjadi diterima.",
      });
      setOpen(false);
    }

    if (isUpdateDiterimaStatusError) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Terjadi kesalahan saat memperbarui status peminjaman ruangan.",
      });
    }
  }, [isUpdateDiterimaStatusSuccess, isUpdateDiterimaStatusError]);

  useEffect(() => {
    if (isUpdateDitolakStatusSuccess) {
      toast({
        title: "Success",
        description: "Status peminjaman ruangan telah diubah menjadi ditolak.",
      });
      setOpen(false);
    }

    if (isUpdateDitolakStatusError) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Terjadi kesalahan saat memperbarui status peminjaman ruangan.",
      });
    }
  }, [isUpdateDitolakStatusSuccess, isUpdateDitolakStatusError]);

  useEffect(() => {
    if (isBatalkanRoomsLoansSuccess) {
      toast({
        title: "Success",
        description: "Pembatalan peminjaman ruangan berhasil.",
      });
      setOpen(false);
    }

    if (isBatalkanRoomsLoansError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat membatalkan peminjaman ruangan.",
      });
    }
  }, [isBatalkanRoomsLoansSuccess, isBatalkanRoomsLoansError]);

  useEffect(() => {
    if (isDeleteRoomsLoansSuccess) {
      toast({
        title: "Success",
        description: "Penghapusan peminjaman ruangan berhasil.",
      });
      setOpen(false);
    }

    if (isDeleteRoomsLoansError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menghapus peminjaman ruangan.",
      });
    }
  }, [isDeleteRoomsLoansSuccess, isDeleteRoomsLoansError]);

  useEffect(() => {
    if (isKembalikanRoomsLoansSuccess) {
      toast({
        title: "Success",
        description: "Pengembalian peminjaman ruangan berhasil.",
      });
      setOpen(false);
    }

    if (isKembalikanRoomsLoansError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengembalikan peminjaman ruangan.",
      });
    }
  }, [isKembalikanRoomsLoansSuccess, isKembalikanRoomsLoansError]);

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
          <DetailButton id={roomsLoans.id} />
          {role === "admin" && (
            <>
              {roomsLoans.status === "Pending" && (
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
              {roomsLoans.status === "Direview" && (
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
              {(roomsLoans.status === "Diterima" ||
                roomsLoans.status === "Ditolak") &&
                null}
              <DropdownMenuItem
                className={cn("hover:cursor-pointer")}
                onClick={() => handleDeleteRoomsLoans()}
              >
                {isDeleteRoomsLoansLoading && (
                  <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                )}
                Delete
              </DropdownMenuItem>
            </>
          )}
          {(!role || role !== "admin") && (
            <>
              {roomsLoans.status === "Pending" && (
                <>
                  <EditButton id={roomsLoans.id} />
                  <DropdownMenuItem
                    className={cn("hover:cursor-pointer")}
                    onClick={() => handleBatalkanRoomsLoans()}
                  >
                    {isBatalkanRoomsLoansLoading && (
                      <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                    )}
                    Batalkan
                  </DropdownMenuItem>
                </>
              )}
              {roomsLoans.status === "Direview" && null}
              {roomsLoans.status === "Diterima" && (
                <DropdownMenuItem
                  className={cn("hover:cursor-pointer")}
                  onClick={() => handleKembalikanRoomsLoans()}
                >
                  {isKembalikanRoomsLoansLoading && (
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
