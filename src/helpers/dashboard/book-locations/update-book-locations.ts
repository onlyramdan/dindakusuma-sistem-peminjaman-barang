/* eslint-disable react-hooks/rules-of-hooks */
import { ApiBookLocationsUpdateRequestValidator } from "@/lib/validator/dashboard/book-locations/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updateBookLocations = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof ApiBookLocationsUpdateRequestValidator>) => {
      const { data } = await axios.put(
        `/api/dashboard/book-locations/update/${newData.id}`,
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
          queryKey: ["bookLocations"],
        });
      },
    }
  );

  return mutation;
};
