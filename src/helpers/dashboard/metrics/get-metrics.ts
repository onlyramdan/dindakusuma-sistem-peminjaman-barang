import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getMetrics = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/metrics", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
