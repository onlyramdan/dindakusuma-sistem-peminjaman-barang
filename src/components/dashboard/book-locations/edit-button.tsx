/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { detailBookLocations } from "@/helpers/dashboard/book-locations/detail-book-locations";
import { updateBookLocations } from "@/helpers/dashboard/book-locations/update-book-locations";
import { cn } from "@/lib/utils";
import { bookLocationsFormSchema } from "@/lib/validator/dashboard/book-locations/api";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { useToast } from "@/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function EditButton({ id }: { id: number }) {
  const form = useForm<z.infer<typeof bookLocationsFormSchema>>({
    resolver: zodResolver(bookLocationsFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = detailBookLocations(id, isOpen);
  const {
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = updateBookLocations();
  const { toast } = useToast();

  const onUpdateHandler = (values: z.infer<typeof bookLocationsFormSchema>) => {
    updateMutate({ id, ...values });
  };

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data lokasi buku",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [data, error, form]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Lokasi buku berhasil diperbarui",
      });
      setIsOpen(false);
    }

    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui lokasi buku",
      });
    }
  }, [isUpdateSuccess, isUpdateError]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem className={cn("hover:cursor-pointer")}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Edit Lokasi Buku</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onUpdateHandler)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lokasi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Perpustakaan"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading || isUpdateLoading}>
                {(isLoading || isUpdateLoading) && (
                  <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                )}
                Perbarui
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
