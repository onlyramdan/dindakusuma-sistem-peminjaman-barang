import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getRoomsLoans = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["roomsLoans"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/rooms-loans", {
        headers: {
          "Cache-Control": "no-store",
        },
      });

      return data.data;
    },
  });
};
