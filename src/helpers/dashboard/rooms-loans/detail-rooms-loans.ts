import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const detailRoomsLoans = (id: number, isClicked: boolean) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ["detailRoomsLoans", id],
    async () => {
      const { data } = await axios.get(
        `/api/dashboard/rooms-loans/detail/${id}`,
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
