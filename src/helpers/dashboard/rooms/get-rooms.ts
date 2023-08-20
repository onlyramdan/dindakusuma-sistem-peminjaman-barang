import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getRooms = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/rooms", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
