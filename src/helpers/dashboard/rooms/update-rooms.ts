/* eslint-disable react-hooks/rules-of-hooks */
import { ApiRoomsUpdateRequestValidator } from "@/lib/validator/dashboard/rooms/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updateRooms = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof ApiRoomsUpdateRequestValidator>) => {
      const { data } = await axios.put(
        `/api/dashboard/rooms/update/${newData.id}`,
        {
          name: newData.name,
        },
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
      },
    }
  );

  return mutation;
};
