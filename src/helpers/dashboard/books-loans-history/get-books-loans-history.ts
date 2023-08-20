import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBooksLoansHistory = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["booksLoansHistory"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/books-loans-history", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
