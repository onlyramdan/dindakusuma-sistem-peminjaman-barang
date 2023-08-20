/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Textarea } from "@/components/ui/textarea";
import { charCounter } from "@/helpers/char-counter";
import { updateDetailRoomsLoans } from "@/helpers/dashboard/rooms-loans/update-detail-rooms-loans";
import { updateRoomsLoans } from "@/helpers/dashboard/rooms-loans/update-rooms-loans";
import { cn } from "@/lib/utils";
import { roomLoansFormSchema } from "@/lib/validator/dashboard/rooms-loans/api";
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
import { useDebouncedValue } from "@mantine/hooks";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface HandleChangeProps {
  e: React.ChangeEvent<HTMLTextAreaElement>;
  name: "keterangan";
  limit: number;
  setState: any;
}

export default function EditButton({ id }: { id: number }) {
  const [keterangan, setKeterangan] = useState("");
  const form = useForm<z.infer<typeof roomLoansFormSchema>>({
    resolver: zodResolver(roomLoansFormSchema),
    defaultValues: {
      roomId: "",
      tanggalPinjam: new Date(),
      keterangan: "",
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
  } = updateDetailRoomsLoans(id, isOpen);
  const {
    isSuccess: isUpdateSuccess,
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = updateRoomsLoans();
  const { toast } = useToast();
  const [debounced] = useDebouncedValue(keterangan, 200);

  const handleChange = ({ e, name, limit, setState }: HandleChangeProps) => {
    const inputValue = e.target.value;
    if (inputValue.length <= limit) {
      setState(inputValue);
      form.setValue(name, inputValue);
    } else {
      setState(inputValue.slice(0, limit));
      form.setValue(name, inputValue.slice(0, limit));
    }
  };

  useEffect(() => {
    if (tanggalKembali) {
      form.setValue("tanggalKembali", tanggalKembali);
    }
  }, [tanggalKembali, form]);

  useEffect(() => {
    if (data) {
      form.setValue("roomId", data.room.name);
      form.setValue("tanggalPinjam", new Date(data.start));
      setTanggalKembali(new Date(data.end));
      form.setValue("tanggalKembali", new Date(data.end));
      setKeterangan(data.keterangan);
      form.setValue("keterangan", data.keterangan);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data detail ruangan",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [data, error, form]);

  function onSubmit(values: z.infer<any>) {
    updateMutate({ id, ...values });
  }

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Success",
        description: "Peminjaman ruangan berhasil diperbarui",
      });
      setIsOpen(false);
    }

    if (isUpdateError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui peminjaman ruangan",
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
          <DialogTitle>Edit Pinjam Ruangan</DialogTitle>
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
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama Ruangan
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
              <FormField
                control={form.control}
                name="keterangan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Keterangan
                      <span className="ml-1 text-sm text-red-500 dark:text-red-400">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div className={cn("space-y-4")}>
                        <Textarea
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis velit eleifend tortor lacinia placerat. Morbi non tortor augue. Nam vel iaculis sapien. Nunc aliquet risus id nibh accumsan faucibus. Curabitur lacus sem, egestas at aliquam eu, viverra non sem. Donec tristique tincidunt magna, ut mi."
                          {...field}
                          value={keterangan}
                          onChange={(e) =>
                            handleChange({
                              e,
                              name: "keterangan",
                              limit: 300,
                              setState: setKeterangan,
                            })
                          }
                          className="resize-none"
                          required
                        />
                        <div className="flex justify-start md:justify-end">
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Sisa karakter {charCounter(debounced, 300)}
                          </p>
                        </div>
                        <FormMessage />
                      </div>
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
        )}
      </DialogContent>
    </Dialog>
  );
}
