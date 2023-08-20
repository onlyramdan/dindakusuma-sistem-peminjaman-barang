import { formSettingsSchema } from "@/lib/validator/dashboard/account/settings/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updateInformation = (id: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(async (newData: z.infer<typeof formSettingsSchema>) => {
    const { data } = await axios.put(
      `/api/dashboard/account/settings/${id}`,
      newData,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    return data.data;
  });
};
