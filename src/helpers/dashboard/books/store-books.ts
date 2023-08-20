/* eslint-disable react-hooks/rules-of-hooks */
import { bookFormSchema } from "@/lib/validator/dashboard/books/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeBooks = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof bookFormSchema>) => {
      const { data } = await axios.post("/api/dashboard/books/store", newData, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["books"],
        });
      },
    }
  );

  return mutation;
};
