import { z } from "zod";

export const createRoomsLoansProps = z.object({
  id: z.number(),
  namaRuangan: z.string(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
  status: z.number(),
});
export const ApiRoomsLoansUpdateRequestValidator = createRoomsLoansProps;
export const updateRoomsLoansAdminProps = z.object({
  id: z.number(),
  status: z.number(),
});
export const ApiRoomsLoansAdminUpdateRequestValidator =
  updateRoomsLoansAdminProps;

export const createGetResponseRoomsLoansProps = z.object({
  id: z.number(),
  namaRuangan: z.string(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
  status: z.string(),
});
export const ApiRoomsLoansGetResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createGetResponseRoomsLoansProps),
});

export const updateRoomsLoansFormSchema = z.object({
  id: z.number(),
  tanggalKembali: z.date({
    required_error: "Tanggal kembali harus diisi.",
  }),
  keterangan: z
    .string()
    .nonempty({
      message: "Keterangan tidak boleh kosong.",
    })
    .min(10, {
      message: "Keterangan minimal 10 karakter.",
    })
    .max(300, {
      message: "Keterangan maksimal 300 karakter.",
    }),
});

export const roomLoansFormSchema = z.object({
  roomId: z.string().nonempty({
    message: "Ruangan tidak boleh kosong.",
  }),
  tanggalPinjam: z.date({
    required_error: "Tanggal pinjam harus diisi.",
  }),
  tanggalKembali: z.date({
    required_error: "Tanggal kembali harus diisi.",
  }),
  keterangan: z
    .string()
    .nonempty({
      message: "Keterangan tidak boleh kosong.",
    })
    .min(10, {
      message: "Keterangan minimal 10 karakter.",
    })
    .max(300, {
      message: "Keterangan maksimal 300 karakter.",
    }),
});

const createRoomsLoansRequestValidator = z.object({
  roomId: z.string().nonempty({
    message: "Ruangan tidak boleh kosong.",
  }),
  tanggalPinjam: z
    .string()
    .nonempty({
      message: "Tanggal pinjam harus diisi.",
    })
    .transform((val) => new Date(val)),
  tanggalKembali: z
    .string()
    .nonempty({
      message: "Tanggal pinjam harus diisi.",
    })
    .transform((val) => new Date(val)),
  keterangan: z
    .string()
    .nonempty({
      message: "Keterangan tidak boleh kosong.",
    })
    .min(10, {
      message: "Keterangan minimal 10 karakter.",
    })
    .max(300, {
      message: "Keterangan maksimal 300 karakter.",
    }),
});
export const ApiRoomsLoansRequestValidator = createRoomsLoansRequestValidator;

export const createResponseRoomsLoansProps = z.object({
  id: z.number(),
  namaRuangan: z.string(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  keterangan: z.string(),
  namaPeminjam: z.string(),
  status: z.string(),
});
export const ApiRoomsLoansResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createResponseRoomsLoansProps),
});
export const ApiRoomsLoansDetailResponseValidator = z.object({
  error: z.string().nullable(),
  data: createResponseRoomsLoansProps,
});

export const ApiRoomsLoansDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type RoomsLoansProps = z.infer<typeof createResponseRoomsLoansProps>;
