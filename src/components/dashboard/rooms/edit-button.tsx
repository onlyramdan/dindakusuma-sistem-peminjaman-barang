/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DropdownMenuItem } from "@/ui/dropdown-menu";
import { useToast } from "@/ui/use-toast";
import { detailRooms } from "@/helpers/dashboard/rooms/detail-rooms";
import { updateRooms } from "@/helpers/dashboard/rooms/update-rooms";
import { cn } from "@/lib/utils";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function EditButton({ id }: { id: number }) {
  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = detailRooms(id, isOpen);
  const {
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = updateRooms();
  const { toast } = useToast();

  const onUpdateHandler = (values: z.infer<typeof roomFormSchema>) => {
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
        description: "Terjadi kesalahan saat mengambil data ruangan",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [data, error, form]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Ruangan berhasil diperbarui",
      });
      setIsOpen(false);
    }

    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui ruangan",
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
          <DialogTitle>Edit Ruangan</DialogTitle>
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
              <Button type="submit" disabled={isLoading || isUpdateLoading}>
                {(isLoading || isUpdateLoading) && (
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
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
