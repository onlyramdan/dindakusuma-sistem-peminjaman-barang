/* eslint-disable react-hooks/rules-of-hooks */
import { ApiStatusesUpdateRequestValidator } from "@/lib/validator/dashboard/statuses/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updateStatuses = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof ApiStatusesUpdateRequestValidator>) => {
      const { data } = await axios.put(
        `/api/dashboard/statuses/update/${newData.id}`,
        {
          keterangan: newData.keterangan,
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
          queryKey: ["statuses"],
        });
      },
    }
  );

  return mutation;
};
