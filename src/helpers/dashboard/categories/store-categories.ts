/* eslint-disable react-hooks/rules-of-hooks */
import { categoryFormSchema } from "@/lib/validator/dashboard/categories/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof categoryFormSchema>) => {
      const { data } = await axios.post(
        "/api/dashboard/categories/store",
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
          queryKey: ["categories"],
        });
      },
    }
  );

  return mutation;
};
