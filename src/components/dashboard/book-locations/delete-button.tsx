/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { deleteBookLocations } from "@/helpers/dashboard/book-locations/delete-book-locations";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";
import { Button } from "@/ui/button";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import { useToast } from "@/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

type DeleteProps = {
  id: number;
  name: string;
  setOpen: (open: boolean) => void;
};

const DeleteButton = ({ id, name, setOpen }: DeleteProps) => {
  const { isSuccess, mutate, isLoading, isError } = deleteBookLocations();
  const { toast } = useToast();

  const onDeleteHandler = (id: number) => {
    mutate(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Lokasi Dihapus",
        description: `Lokasi \"${name}\" telah berhasil dihapus`,
      });
      setOpen(false);
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menghapus data",
      });
      setOpen(false);
    }
  }, [isSuccess, isError, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem className={cn("hover:cursor-pointer")}>
          {isLoading && <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />}
          Hapus
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini tidak dapat dibatalkan. Data akan dihapus secara permanen
            dari server kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" asChild>
            <AlertDialogAction
              onClick={() => {
                onDeleteHandler(id);
              }}
            >
              Hapus
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
