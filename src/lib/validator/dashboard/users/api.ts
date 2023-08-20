import { z } from "zod";

export const createUsersProps = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  role: z.string().nullable(),
  lastSignInAt: z.string(),
});

export const ApiUserListResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.array(createUsersProps),
});

export const APIUserDeleteResponseValidator = z.object({
  error: z.string().nullable(),
  data: z.string(),
});

export type UsersProps = z.infer<typeof createUsersProps>;
