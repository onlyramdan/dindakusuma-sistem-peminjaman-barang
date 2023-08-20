/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const kembalikanRoomsLoans = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<any>) => {
      const { data } = await axios.put(
        `/api/dashboard/rooms-loans/update/kembalikan-rooms-loans/${newData.id}`,
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
          queryKey: ["rooms"],
        });
        queryClient.invalidateQueries({
          queryKey: ["roomsLoans"],
        });
        queryClient.invalidateQueries({
          queryKey: ["roomsTersedia"],
        });
        queryClient.invalidateQueries({
          queryKey: ["detailRoomsLoans"],
        });
        queryClient.invalidateQueries({
          queryKey: ["booksLoansHistory"],
        });
      },
    }
  );

  return mutation;
};
