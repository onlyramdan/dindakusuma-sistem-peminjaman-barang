/* eslint-disable react-hooks/rules-of-hooks */
import { ApiBooksUpdateRequestValidator } from "@/lib/validator/dashboard/books/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updateBooks = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof ApiBooksUpdateRequestValidator>) => {
      const { data } = await axios.put(
        `/api/dashboard/books/update/${newData.id}`,
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
          queryKey: ["books"],
        });
      },
    }
  );

  return mutation;
};
