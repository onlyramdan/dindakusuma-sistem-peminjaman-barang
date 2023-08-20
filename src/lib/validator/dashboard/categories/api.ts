import { z } from "zod";

export const createCategoriesProps = z.object({
  id: z.number(),
  name: z
    .string()
    .nonempty({ message: "Nama kategori tidak boleh kosong" })
    .min(2, { message: "Nama kategori minimal 2 karakter" })
    .max(50, { message: "Nama kategori maksimal 50 karakter" }),
});
export const ApiCategoriesUpdateRequestValidator = createCategoriesProps;

export const categoryFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Nama kategori tidak boleh kosong" })
    .min(2, { message: "Nama kategori minimal 2 karakter" })
    .max(50, { message: "Nama kategori maksimal 50 karakter" }),
});
export const ApiCategoriesRequestValidator = categoryFormSchema;

export const ApiCategoriesResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createCategoriesProps),
});

export const ApiCategoriesDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type CategoriesProps = z.infer<typeof createCategoriesProps>;
