/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DropdownMenuItem } from "@/ui/dropdown-menu";
import { useToast } from "@/ui/use-toast";
import { detailCategory } from "@/helpers/dashboard/categories/detail-categories";
import { updateCategories } from "@/helpers/dashboard/categories/update-categories";
import { cn } from "@/lib/utils";
import { categoryFormSchema } from "@/lib/validator/dashboard/categories/api";
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
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = detailCategory(id, isOpen);
  const {
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = updateCategories();
  const { toast } = useToast();

  const onUpdateHandler = (values: z.infer<typeof categoryFormSchema>) => {
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
        description: "Terjadi kesalahan saat mengambil data kategori buku",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [data, error, form]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Kategori buku berhasil diperbarui",
      });
      setIsOpen(false);
    }

    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui kategori buku",
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
          <DialogTitle>Edit Kategori Buku</DialogTitle>
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
                  <FormLabel>Nama Kategori</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Machine Learning"
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
