import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getRoomsTersedia = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["roomsTersedia"],
    queryFn: async () => {
      const { data } = await axios.get(
        "/api/dashboard/rooms-loans/rooms-tersedia",
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
