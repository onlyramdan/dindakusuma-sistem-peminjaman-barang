/* eslint-disable react-hooks/rules-of-hooks */
import { roomFormSchema } from "@/lib/validator/dashboard/rooms/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeRooms = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof roomFormSchema>) => {
      const { data } = await axios.post("/api/dashboard/rooms/store", newData, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["rooms"],
        });
      },
    }
  );

  return mutation;
};
