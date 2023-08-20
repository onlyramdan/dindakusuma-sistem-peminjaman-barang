/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Calendar } from "@/ui/calendar";
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
import { Textarea } from "@/ui/textarea";
import { charCounter } from "@/helpers/char-counter";
import { getRoomsTersedia } from "@/helpers/dashboard/rooms-loans/get-rooms-tersedia";
import { storeRoomsLoans } from "@/helpers/dashboard/rooms-loans/store-rooms-loans";
import { cn } from "@/lib/utils";
import { roomLoansFormSchema } from "@/lib/validator/dashboard/rooms-loans/api";
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
import { useDebouncedValue } from "@mantine/hooks";
import { CalendarIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface HandleChangeProps {
  e: React.ChangeEvent<HTMLTextAreaElement>;
  name: "keterangan";
  limit: number;
  setState: any;
}

export default function AddButton() {
  const [keterangan, setKeterangan] = useState("");
  const form = useForm<z.infer<typeof roomLoansFormSchema>>({
    resolver: zodResolver(roomLoansFormSchema),
    defaultValues: {
      roomId: "",
      tanggalPinjam: new Date(),
      keterangan: keterangan,
    },
  });
  const [rooms, setRooms] = useState([{ id: "", name: "" }]);
  const { data, isLoading, error } = getRoomsTersedia();
  const [tanggalKembali, setTanggalKembali] = useState<Date>();
  const { toast } = useToast();
  const [debounced] = useDebouncedValue(keterangan, 200);
  const [isOpen, setIsOpen] = useState(false);
  const {
    isSuccess: isSuccessStore,
    mutate: mutateStore,
    isLoading: isLoadingStore,
    isError: isErrorStore,
  } = storeRoomsLoans();

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
      setRooms(data);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data ruangan",
      });
    }
  }, [data, error]);

  function onSubmit(values: z.infer<typeof roomLoansFormSchema>) {
    const tanggalKembali = new Date(values.tanggalKembali);
    values = { ...values, tanggalKembali };
    mutateStore(values);
    form.reset();
    setKeterangan("");
    setTanggalKembali(undefined);
  }

  useEffect(() => {
    if (isSuccessStore) {
      toast({
        title: "Success",
        description: "Pinjam Ruangan berhasil ditambahkan",
      });
      setIsOpen(false);
    }

    if (isErrorStore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan pinjam ruangan",
      });
      form.reset();
      setIsOpen(false);
    }
  }, [isSuccessStore, isErrorStore, form]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Pinjam Ruangan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:text-slate-50">
        <DialogHeader>
          <DialogTitle>Pinjam Ruangan</DialogTitle>
        </DialogHeader>
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
                  <div className={cn("space-y-4")}>
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && (
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Ruangan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {rooms.length === 0 && (
                              <SelectLabel>Ruangan tidak tersedia</SelectLabel>
                            )}
                            {rooms.length > 0 && (
                              <SelectLabel>Ruangan</SelectLabel>
                            )}
                            {rooms.map((room) => (
                              <SelectItem
                                key={`ruangan-${room.id}`}
                                value={room.id.toString()}
                              >
                                {room.name}
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
            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Keterangan Peminjaman
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
