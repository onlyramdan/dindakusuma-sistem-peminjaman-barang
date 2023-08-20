/* eslint-disable react-hooks/rules-of-hooks */
import { bookLoansFormSchema } from "@/lib/validator/dashboard/book-loans/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeBooksLoans = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof bookLoansFormSchema>) => {
      const { data } = await axios.post(
        "/api/dashboard/books-loans/store",
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
          queryKey: ["booksLoans"],
        });
        queryClient.invalidateQueries({
          queryKey: ["booksTersedia"],
        });
        queryClient.invalidateQueries({
          queryKey: ["booksTersedia", "id"],
        });
      },
    }
  );

  return mutation;
};
