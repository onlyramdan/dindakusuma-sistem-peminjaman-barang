/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const batalkanBooksLoans = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<any>) => {
      const { data } = await axios.delete(
        `/api/dashboard/books-loans/update/batalkan-books-loans/${newData.id}`,
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
        queryClient.invalidateQueries({
          queryKey: ["booksLoans"],
        });
        queryClient.invalidateQueries({
          queryKey: ["booksTersedia"],
        });
        queryClient.invalidateQueries({
          queryKey: ["detailBooksLoans"],
        });
      },
    }
  );

  return mutation;
};
