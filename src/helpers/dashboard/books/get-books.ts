import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBooks = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/books", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
