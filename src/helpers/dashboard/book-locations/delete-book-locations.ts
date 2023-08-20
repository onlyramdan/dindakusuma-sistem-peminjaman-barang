/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const deleteBookLocations = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id: number) => {
      const { data } = await axios.delete(
        `/api/dashboard/book-locations/delete/${id}`,
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
