import { z } from "zod";

export const createBooksLoansProps = z.object({
  id: z.number(),
  namaBuku: z.string(),
  jumlah: z.number(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
  status: z.number(),
});
export const ApiBooksLoansUpdateRequestValidator = createBooksLoansProps;
export const updateBooksLoansAdminProps = z.object({
  id: z.number(),
  status: z.number(),
});
export const ApiBooksLoansAdminUpdateRequestValidator =
  updateBooksLoansAdminProps;

export const updateBooksLoansFormSchema = z.object({
  id: z.number(),
  quantity: z
    .string()
    .nonempty({
      message: "Jumlah pinjam tidak boleh kosong.",
    })
    .min(1, {
      message: "Jumlah pinjam tidak boleh kurang dari 1.",
    }),
  tanggalKembali: z.date({
    required_error: "Tanggal kembali harus diisi.",
  }),
});

export const bookLoansFormSchema = z.object({
  bookId: z.string().nonempty({
    message: "Buku tidak boleh kosong.",
  }),
  quantity: z
    .string()
    .nonempty({
      message: "Jumlah pinjam tidak boleh kosong.",
    })
    .min(1, {
      message: "Jumlah pinjam tidak boleh kurang dari 1.",
    }),
  tanggalPinjam: z.date({
    required_error: "Tanggal pinjam harus diisi.",
  }),
  tanggalKembali: z.date({
    required_error: "Tanggal kembali harus diisi.",
  }),
});
const createBooksLoansRequestValidator = z.object({
  bookId: z.string().nonempty({
    message: "Buku tidak boleh kosong.",
  }),
  quantity: z.string().nonempty({
    message: "Jumlah pinjam tidak boleh kosong.",
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
});
export const ApiBooksLoansRequestValidator = createBooksLoansRequestValidator;

export const createResponseBooksLoansProps = z.object({
  id: z.number(),
  namaBuku: z.string(),
  jumlah: z.number(),
  tanggalPinjam: z.string(),
  tanggalKembali: z.string(),
  namaPeminjam: z.string(),
  status: z.string(),
});
export const ApiBooksLoansResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createResponseBooksLoansProps),
});
export const ApiBooksLoansDetailResponseValidator = z.object({
  error: z.string().nullable(),
  data: createResponseBooksLoansProps,
});

export const ApiBooksLoansDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type BooksLoansProps = z.infer<typeof createResponseBooksLoansProps>;
