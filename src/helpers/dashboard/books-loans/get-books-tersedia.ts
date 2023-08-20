import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBooksTersedia = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["booksTersedia"],
    queryFn: async () => {
      const { data } = await axios.get(
        "/api/dashboard/books-loans/books-tersedia",
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );

      return data.data;
    },
  });
};
