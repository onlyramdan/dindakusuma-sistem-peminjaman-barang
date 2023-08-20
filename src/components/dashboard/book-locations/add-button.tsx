"use client";

import { storeBookLocations } from "@/helpers/dashboard/book-locations/store-book-locations";
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
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function AddButton() {
  const form = useForm<z.infer<typeof bookLocationsFormSchema>>({
    resolver: zodResolver(bookLocationsFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { isSuccess, mutate, isLoading, isError } = storeBookLocations();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(values: z.infer<typeof bookLocationsFormSchema>) {
    mutate(values);

    form.reset();
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Lokasi buku berhasil ditambahkan",
      });
      setIsOpen(false);
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan lokasi buku",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [isSuccess, isError, form, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Tambah Lokasi Buku
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Tambah Lokasi Buku</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
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
