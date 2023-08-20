"use client";

import { storeRooms } from "@/helpers/dashboard/rooms/store-rooms";
import { roomFormSchema } from "@/lib/validator/dashboard/rooms/api";
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
  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { isSuccess, mutate, isLoading, isError } = storeRooms();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(values: z.infer<typeof roomFormSchema>) {
    mutate(values);

    form.reset();
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Ruangan berhasil ditambahkan",
      });
      setIsOpen(false);
    }

    if (isError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan ruangan",
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
          Tambah Ruangan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Tambah Ruangan</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Ruangan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ruangan Lab Komputer"
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
