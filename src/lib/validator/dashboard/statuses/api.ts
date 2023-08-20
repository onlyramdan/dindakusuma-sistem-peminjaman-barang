import { z } from "zod";

export const createStatusesProps = z.object({
  id: z.number(),
  keterangan: z
    .string()
    .nonempty({ message: "Keterangan tidak boleh kosong" })
    .min(2, { message: "Keterangan minimal 2 karakter" })
    .max(50, { message: "Keterangan maksimal 50 karakter" }),
});
export const ApiStatusesUpdateRequestValidator = createStatusesProps;

export const statusesFormSchema = z.object({
  keterangan: z
    .string()
    .nonempty({ message: "Keterangan tidak boleh kosong" })
    .min(2, { message: "Keterangan minimal 2 karakter" })
    .max(50, { message: "Keterangan maksimal 50 karakter" }),
});

export const ApiStatusesRequestValidator = statusesFormSchema;

export const ApiStatusesListResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createStatusesProps),
});

export const APIStatusesDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type StatusesProps = z.infer<typeof createStatusesProps>;
