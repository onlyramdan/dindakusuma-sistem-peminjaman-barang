import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const detailBookLocations = (id: number, isClicked: boolean) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ["detailBookLocations", id],
    async () => {
      const { data } = await axios.get(
        `/api/dashboard/book-locations/detail/${id}`,
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
