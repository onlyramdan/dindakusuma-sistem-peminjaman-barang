import { z } from "zod";

export const createBookLocationsProps = z.object({
  id: z.number(),
  name: z
    .string()
    .nonempty({ message: "Nama lokasi tidak boleh kosong" })
    .min(2, { message: "Nama lokasi minimal 2 karakter" })
    .max(50, { message: "Nama lokasi maksimal 50 karakter" }),
});
export const ApiBookLocationsUpdateRequestValidator = createBookLocationsProps;

export const bookLocationsFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Nama lokasi tidak boleh kosong" })
    .min(2, { message: "Nama lokasi minimal 2 karakter" })
    .max(50, { message: "Nama lokasi maksimal 50 karakter" }),
});
export const ApiBookLocationsRequestValidator = bookLocationsFormSchema;

export const ApiBookLocationsResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createBookLocationsProps),
});

export const ApiBookLocationsDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type BookLocationsProps = z.infer<typeof createBookLocationsProps>;
