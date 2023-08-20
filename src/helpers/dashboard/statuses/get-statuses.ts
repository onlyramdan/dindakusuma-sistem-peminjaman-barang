import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getStatuses = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["statuses"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/statuses", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
