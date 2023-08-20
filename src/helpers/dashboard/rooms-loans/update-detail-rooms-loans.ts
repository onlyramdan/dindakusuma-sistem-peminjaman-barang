import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const updateDetailRoomsLoans = (id: number, isClicked: boolean) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ["updateDetailRoomsLoans", id],
    async () => {
      const { data } = await axios.get(
        `/api/dashboard/rooms-loans/update/detail/${id}`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      return data.data;
    },
    {
      enabled: isClicked,
    }
  );
};
