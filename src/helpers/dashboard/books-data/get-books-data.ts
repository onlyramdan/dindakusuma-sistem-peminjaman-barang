import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBooksData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["booksData"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/books-data", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
