import { z } from "zod";

export const createBooksLoansHistoryProps = z.object({
  id: z.number(),
  judul: z.string(),
  jumlah: z.number(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
});

export const ApiBooksLoansHistoryResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createBooksLoansHistoryProps),
});

export type BooksLoansHistoryProps = z.infer<
  typeof createBooksLoansHistoryProps
>;
