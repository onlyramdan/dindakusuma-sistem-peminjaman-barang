import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBooksLoans = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["booksLoans"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/books-loans", {
        headers: {
          "Cache-Control": "no-store",
        },
      });

      return data.data;
    },
  });
};
