/* eslint-disable react-hooks/rules-of-hooks */
import { updateRoomsLoansFormSchema } from "@/lib/validator/dashboard/rooms-loans/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updateRoomsLoans = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof updateRoomsLoansFormSchema>) => {
      const { data } = await axios.put(
        `/api/dashboard/rooms-loans/update/${newData.id}`,
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
      },
    }
  );

  return mutation;
};
