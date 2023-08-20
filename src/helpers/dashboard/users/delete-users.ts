/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const deleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id: string) => {
      const { data } = await axios.delete(`/api/dashboard/users/delete/${id}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    }
  );

  return mutation;
};
