/* eslint-disable react-hooks/rules-of-hooks */
import { statusesFormSchema } from "@/lib/validator/dashboard/statuses/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof statusesFormSchema>) => {
      const { data } = await axios.post(
        "/api/dashboard/statuses/store",
        newData,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["statuses"],
        });
      },
    }
  );

  return mutation;
};
