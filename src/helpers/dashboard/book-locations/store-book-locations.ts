/* eslint-disable react-hooks/rules-of-hooks */
import { bookLocationsFormSchema } from "@/lib/validator/dashboard/book-locations/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const storeBookLocations = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof bookLocationsFormSchema>) => {
      const { data } = await axios.post(
        "/api/dashboard/book-locations/store",
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
          queryKey: ["bookLocations"],
        });
      },
    }
  );

  return mutation;
};
