import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getRoomsLoansHistory = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["roomsLoansHistory"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/rooms-loans-history", {
        headers: {
          "Cache-Control": "no-store",
        },
      });

      return data.data;
    },
  });
};
