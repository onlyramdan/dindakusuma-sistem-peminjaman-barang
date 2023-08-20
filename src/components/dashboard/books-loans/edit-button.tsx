/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { updateBooksLoans } from "@/helpers/dashboard/books-loans/update-books-loans";
import { updateDetailBooksLoans } from "@/helpers/dashboard/books-loans/update-detail-books-loans";
import { cn } from "@/lib/utils";
import { bookLoansFormSchema } from "@/lib/validator/dashboard/book-loans/api";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useToast } from "@/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function DetailButton({ id }: { id: number }) {
  const form = useForm<z.infer<typeof bookLoansFormSchema>>({
    resolver: zodResolver(bookLoansFormSchema),
    defaultValues: {
      bookId: "",
      quantity: "",
      tanggalPinjam: new Date(),
    },
  });
  const [tanggalKembali, setTanggalKembali] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const {
    data,
    isLoading,
    error,
  }: {
    data: any;
    isLoading: boolean;
    error: any;
  } = updateDetailBooksLoans(id, isOpen);
  const {
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = updateBooksLoans();
  const { toast } = useToast();

  useEffect(() => {
    if (tanggalKembali) {
      form.setValue("tanggalKembali", tanggalKembali);
    }
  }, [tanggalKembali, form]);

  useEffect(() => {
    if (data) {
      form.setValue("bookId", data.book.judul);
      form.setValue("quantity", data.quantity.toString());
      form.setValue("tanggalPinjam", new Date(data.start));
      setTanggalKembali(new Date(data.end));
      form.setValue("tanggalKembali", new Date(data.end));
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data detail buku",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [data, error, form]);

  function onSubmit(values: z.infer<typeof bookLoansFormSchema>) {
    updateMutate({ id, ...values });
  }

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Peminjaman buku berhasil diperbarui",
      });
      setIsOpen(false);
    }

    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui peminjaman buku",
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
          <DialogTitle>Edit Pinjam Buku</DialogTitle>
        </DialogHeader>
        {isLoading && (
          <p className="flex items-center gap-2 space-x-2 leading-7">
            <ReloadIcon className="w-5 h-5 animate-spin" />
            Memuat data...
          </p>
        )}
        {!isLoading && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="bookId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Judul Buku
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Jumlah Pinjam
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalPinjam"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Tanggal Pinjam
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled
                          >
                            {field.value ? (
                              format(field.value, "dd MMMM yyyy", {
                                locale: idLocale,
                              })
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          disabled
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalKembali"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Tanggal Kembali
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMMM yyyy", {
                                locale: idLocale,
                              })
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={tanggalKembali}
                          onSelect={setTanggalKembali}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
        )}
      </DialogContent>
    </Dialog>
  );
}
