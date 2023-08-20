import { z } from "zod";

export const createRoomsProps = z.object({
  id: z.number(),
  name: z
    .string()
    .nonempty({ message: "Nama ruangan tidak boleh kosong" })
    .startsWith("Ruangan", {
      message: 'Nama ruangan harus diawali dengan "Ruangan"',
    })
    .min(2, { message: "Nama ruangan minimal 2 karakter" })
    .max(50, { message: "Nama ruangan maksimal 50 karakter" }),
});
export const ApiRoomsUpdateRequestValidator = createRoomsProps;

export const roomFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Nama ruangan tidak boleh kosong" })
    .startsWith("Ruangan", {
      message: 'Nama ruangan harus diawali dengan "Ruangan"',
    })
    .min(2, { message: "Nama ruangan minimal 2 karakter" })
    .max(50, { message: "Nama ruangan maksimal 50 karakter" }),
});
export const ApiRoomsRequestValidator = roomFormSchema;

export const ApiRoomsResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      tersedia: z.boolean(),
    })
  ),
});

export const ApiRoomsDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type RoomsProps = z.infer<typeof createRoomsProps>;
