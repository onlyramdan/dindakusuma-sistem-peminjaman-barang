"use client";

import { storeStatus } from "@/helpers/dashboard/statuses/store-statuses";
import { statusesFormSchema } from "@/lib/validator/dashboard/statuses/api";
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
  const form = useForm<z.infer<typeof statusesFormSchema>>({
    resolver: zodResolver(statusesFormSchema),
    defaultValues: {
      keterangan: "",
    },
  });
  const { isSuccess, mutate, isLoading, isError } = storeStatus();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(values: z.infer<typeof statusesFormSchema>) {
    mutate(values);

    form.reset();
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Status berhasil ditambahkan",
      });
      setIsOpen(false);
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan status",
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
          Tambah Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Tambah Status</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Diterima, Ditolak, Dalam Proses, dll"
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
