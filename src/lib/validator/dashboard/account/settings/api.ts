import { z } from "zod";

export const formSettingsSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "Nama depan tidak boleh kosong" })
    .min(2, { message: "Nama depan minimal 2 karakter" })
    .max(50, { message: "Nama depan maksimal 50 karakter" }),
  lastName: z
    .string()
    .nonempty({ message: "Nama belakang tidak boleh kosong" })
    .min(2, { message: "Nama belakang minimal 2 karakter" })
    .max(50, { message: "Nama belakang maksimal 50 karakter" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Nomor telepon tidak boleh kosong" })
    .min(10, { message: "Nomor telepon minimal 10 karakter" })
    .max(15, { message: "Nomor telepon maksimal 15 karakter" })
    .startsWith("08", { message: "Nomor telepon harus diawali dengan 08" })
    .regex(/^[0-9]*$/, { message: "Nomor telepon hanya boleh berisi angka" }),
  address: z
    .string()
    .nonempty({ message: "Alamat tidak boleh kosong" })
    .min(10, { message: "Alamat minimal 10 karakter" })
    .max(150, { message: "Alamat maksimal 150 karakter" }),
});

export const formSchema = z.object({
  ...formSettingsSchema.shape,
  email: z
    .string()
    .nonempty({ message: "Email tidak boleh kosong" })
    .email({ message: "Email tidak valid" }),
});

export const ApiSettingsRequestValidator = formSettingsSchema;
