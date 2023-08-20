/* eslint-disable react-hooks/rules-of-hooks */
import { roomLoansFormSchema } from "@/lib/validator/dashboard/rooms-loans/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeRoomsLoans = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof roomLoansFormSchema>) => {
      const { data } = await axios.post(
        "/api/dashboard/rooms-loans/store",
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
          queryKey: ["roomsLoans"],
        });
        queryClient.invalidateQueries({
          queryKey: ["roomsTersedia"],
        });
      },
    }
  );

  return mutation;
};
