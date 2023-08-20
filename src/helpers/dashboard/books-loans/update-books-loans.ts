/* eslint-disable react-hooks/rules-of-hooks */
import { updateBooksLoansFormSchema } from "@/lib/validator/dashboard/book-loans/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updateBooksLoans = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof updateBooksLoansFormSchema>) => {
      const { data } = await axios.put(
        `/api/dashboard/books-loans/update/${newData.id}`,
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
