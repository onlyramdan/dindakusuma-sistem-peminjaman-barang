/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const deleteBook = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id: number) => {
      const { data } = await axios.delete(`/api/dashboard/books/delete/${id}`, {
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
