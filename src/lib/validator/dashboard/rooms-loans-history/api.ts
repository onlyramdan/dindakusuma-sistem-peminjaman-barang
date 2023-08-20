import { z } from "zod";

export const createRoomsLoansHistoryProps = z.object({
  id: z.number(),
  namaRuangan: z.string(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
});

export const ApiRoomsLoansHistoryResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createRoomsLoansHistoryProps),
});

export type RoomsLoansHistoryProps = z.infer<
  typeof createRoomsLoansHistoryProps
>;
