import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBookLocations = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["bookLocations"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/book-locations", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
