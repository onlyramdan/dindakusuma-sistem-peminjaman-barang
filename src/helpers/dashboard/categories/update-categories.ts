/* eslint-disable react-hooks/rules-of-hooks */
import { ApiCategoriesUpdateRequestValidator } from "@/lib/validator/dashboard/categories/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const updateCategories = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (newData: z.infer<typeof ApiCategoriesUpdateRequestValidator>) => {
      const { data } = await axios.put(
        `/api/dashboard/categories/update/${newData.id}`,
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
          queryKey: ["categories"],
        });
      },
    }
  );

  return mutation;
};
