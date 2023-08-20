import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBookById = (id: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["detailBooksData", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/dashboard/books-data/${id}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
