import { z } from "zod";

export const yearNow: number = new Date().getFullYear();

export const createBooksProps = z.object({
  id: z.number(),
  coverImage: z
    .string()
    .nonempty({ message: "Gambar sampul buku tidak boleh kosong" }),
  judul: z
    .string()
    .nonempty({ message: "Judul buku tidak boleh kosong" })
    .min(3, { message: "Judul buku minimal 3 karakter" })
    .max(100, { message: "Judul buku maksimal 100 karakter" }),
  sinopsis: z
    .string()
    .nonempty({ message: "Sinopsis buku tidak boleh kosong" })
    .min(3, { message: "Sinopsis buku minimal 3 karakter" })
    .max(10000, { message: "Sinopsis buku maksimal 10000 karakter" }),
  tahun: z
    .string()
    .nonempty({ message: "Tahun buku tidak boleh kosong" })
    .min(4, { message: "Tahun buku minimal 4 karakter" })
    .refine(
      (val) => {
        return parseInt(val) < yearNow;
      },
      { message: "Tahun buku tidak boleh lebih dari tahun sekarang" }
    ),
  penerbit: z
    .string()
    .nonempty({ message: "Penerbit buku tidak boleh kosong" })
    .min(3, { message: "Penerbit buku minimal 3 karakter" })
    .max(100, { message: "Penerbit buku maksimal 100 karakter" }),
  penulis: z
    .string()
    .nonempty({ message: "Penulis buku tidak boleh kosong" })
    .min(3, { message: "Penulis buku minimal 3 karakter" })
    .max(100, { message: "Penulis buku maksimal 100 karakter" }),
  stok: z
    .string()
    .nonempty({ message: "Stok buku tidak boleh kosong" })
    .min(1, { message: "Stok buku minimal 1" })
    .regex(/^[1-9]\d*$/, { message: "Stok buku tidak boleh 0" }),
  lokasiBuku: z
    .string()
    .nonempty({ message: "Lokasi buku tidak boleh kosong" }),
  category: z
    .string()
    .nonempty({ message: "Kategori buku tidak boleh kosong" }),
});

export const ApiBooksUpdateRequestValidator = z.any();

export const bookFormSchema = z.object({
  coverImage: z
    .string()
    .nonempty({ message: "Gambar sampul buku tidak boleh kosong" }),
  judul: z
    .string()
    .nonempty({ message: "Judul buku tidak boleh kosong" })
    .min(3, { message: "Judul buku minimal 3 karakter" })
    .max(100, { message: "Judul buku maksimal 100 karakter" }),
  sinopsis: z
    .string()
    .nonempty({ message: "Sinopsis buku tidak boleh kosong" })
    .min(3, { message: "Sinopsis buku minimal 3 karakter" })
    .max(10000, { message: "Sinopsis buku maksimal 10000 karakter" }),
  tahun: z
    .string()
    .nonempty({ message: "Tahun buku tidak boleh kosong" })
    .min(4, { message: "Tahun buku minimal 4 karakter" })
    .refine(
      (val) => {
        return parseInt(val) < yearNow;
      },
      { message: "Tahun buku tidak boleh lebih dari tahun sekarang" }
    ),
  penerbit: z
    .string()
    .nonempty({ message: "Penerbit buku tidak boleh kosong" })
    .min(3, { message: "Penerbit buku minimal 3 karakter" })
    .max(100, { message: "Penerbit buku maksimal 100 karakter" }),
  penulis: z
    .string()
    .nonempty({ message: "Penulis buku tidak boleh kosong" })
    .min(3, { message: "Penulis buku minimal 3 karakter" })
    .max(100, { message: "Penulis buku maksimal 100 karakter" }),
  stok: z
    .string()
    .nonempty({ message: "Stok buku tidak boleh kosong" })
    .min(1, { message: "Stok buku minimal 1" })
    .regex(/^[1-9]\d*$/, { message: "Stok buku tidak boleh 0" }),
  lokasiBuku: z
    .string()
    .nonempty({ message: "Lokasi buku tidak boleh kosong" }),
  category: z
    .string()
    .nonempty({ message: "Kategori buku tidak boleh kosong" }),
});
export const ApiBooksRequestValidator = bookFormSchema;

export const ApiBooksResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createBooksProps),
});

export const ApiBooksTersediaResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(
    z.object({
      id: z.number(),
      judul: z
        .string()
        .nonempty({ message: "Judul buku tidak boleh kosong" })
        .min(3, { message: "Judul buku minimal 3 karakter" })
        .max(100, { message: "Judul buku maksimal 100 karakter" }),
    })
  ),
});

export const ApiBooksDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export const showBooksProps = z.object({
  id: z.number(),
  coverImage: z
    .string()
    .nonempty({ message: "Gambar sampul buku tidak boleh kosong" }),
  judul: z
    .string()
    .nonempty({ message: "Judul buku tidak boleh kosong" })
    .min(3, { message: "Judul buku minimal 3 karakter" })
    .max(100, { message: "Judul buku maksimal 100 karakter" }),
  sinopsis: z
    .string()
    .nonempty({ message: "Sinopsis buku tidak boleh kosong" })
    .min(3, { message: "Sinopsis buku minimal 3 karakter" })
    .max(10000, { message: "Sinopsis buku maksimal 10000 karakter" }),
  tahun: z
    .number()
    .min(4, { message: "Tahun buku minimal 4 karakter" })
    .refine(
      (val) => {
        return val < yearNow;
      },
      { message: "Tahun buku tidak boleh lebih dari tahun sekarang" }
    ),
  penerbit: z
    .string()
    .nonempty({ message: "Penerbit buku tidak boleh kosong" })
    .min(3, { message: "Penerbit buku minimal 3 karakter" })
    .max(100, { message: "Penerbit buku maksimal 100 karakter" }),
  penulis: z
    .string()
    .nonempty({ message: "Penulis buku tidak boleh kosong" })
    .min(3, { message: "Penulis buku minimal 3 karakter" })
    .max(100, { message: "Penulis buku maksimal 100 karakter" }),
  stok: z.number(),
});
export type BooksProps = z.infer<typeof showBooksProps>;
