/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DropdownMenuItem } from "@/ui/dropdown-menu";
import { useToast } from "@/ui/use-toast";
import { detailStatuses } from "@/helpers/dashboard/statuses/detail-statuses";
import { updateStatuses } from "@/helpers/dashboard/statuses/update-statuses";
import { cn } from "@/lib/utils";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function EditButton({ id }: { id: number }) {
  const form = useForm<z.infer<typeof statusesFormSchema>>({
    resolver: zodResolver(statusesFormSchema),
    defaultValues: {
      keterangan: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = detailStatuses(id, isOpen);
  const {
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = updateStatuses();
  const { toast } = useToast();

  const onUpdateHandler = (values: z.infer<typeof statusesFormSchema>) => {
    updateMutate({ id, ...values });
  };

  useEffect(() => {
    if (data) {
      form.setValue("keterangan", data.keterangan);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data status",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [data, error, form]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Status berhasil diperbarui",
      });
      setIsOpen(false);
    }

    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui status",
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
          <DialogTitle>Edit Status</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onUpdateHandler)}
            className="space-y-8"
          >
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
