/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const deleteStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id: number) => {
      const { data } = await axios.delete(
        `/api/dashboard/statuses/delete/${id}`,
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
