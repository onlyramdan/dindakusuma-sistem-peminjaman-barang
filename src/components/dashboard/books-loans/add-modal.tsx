/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Calendar } from "@/ui/calendar";
import { Input } from "@/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { getBooksTersedia } from "@/helpers/dashboard/books-loans/get-books-tersedia";
import { storeBooksLoans } from "@/helpers/dashboard/books-loans/store-books-loans";
import { cn } from "@/lib/utils";
import { bookLoansFormSchema } from "@/lib/validator/dashboard/book-loans/api";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { useToast } from "@/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function AddModal({
  idBuku,
  children,
}: {
  idBuku?: string;
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof bookLoansFormSchema>>({
    resolver: zodResolver(bookLoansFormSchema),
    defaultValues: {
      bookId: "",
      quantity: "",
      tanggalPinjam: new Date(),
    },
  });
  const [books, setBooks] = useState<any>([]);
  const { data, isLoading, error } = getBooksTersedia();
  const [tanggalKembali, setTanggalKembali] = useState<Date>();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isSuccess: isSuccessStore,
    mutate: mutateStore,
    isLoading: isLoadingStore,
    isError: isErrorStore,
  } = storeBooksLoans();

  useEffect(() => {
    if (idBuku) {
      form.setValue("bookId", idBuku);
    }
  }, [idBuku, form]);

  useEffect(() => {
    if (tanggalKembali) {
      form.setValue("tanggalKembali", tanggalKembali);
    }
  }, [tanggalKembali, form]);

  useEffect(() => {
    if (data) {
      setBooks(data);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data buku",
      });
    }
  }, [data, error]);

  function onSubmit(values: z.infer<typeof bookLoansFormSchema>) {
    const tanggalKembali = new Date(values.tanggalKembali);
    values = { ...values, tanggalKembali };
    mutateStore(values);
    form.reset();
    setTanggalKembali(undefined);
  }

  useEffect(() => {
    if (isSuccessStore) {
      toast({
        title: "Success",
        description: "Pinjam Buku berhasil ditambahkan",
      });
      setIsOpen(false);
    }

    if (isErrorStore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan pinjam buku",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [isSuccessStore, isErrorStore, form]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Pinjam Buku</DialogTitle>
        </DialogHeader>
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
                  <div className={cn("space-y-4")}>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Buku" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {books.length === 0 && (
                              <SelectLabel>Buku tidak tersedia</SelectLabel>
                            )}
                            {books.length > 0 && (
                              <SelectLabel>Buku</SelectLabel>
                            )}
                            {books.map((book: any) => (
                              <SelectItem
                                key={`buku-${book.id}`}
                                value={book.id.toString()}
                              >
                                {book.judul}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </div>
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
                    <Input type="number" placeholder="2" {...field} required />
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
                              locale: id,
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
                              locale: id,
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
              <Button type="submit" disabled={isLoading || isLoadingStore}>
                {(isLoading || isLoadingStore) && (
                  <ReloadIcon className="w-3 h-3 mr-2 animate-spin" />
                )}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
