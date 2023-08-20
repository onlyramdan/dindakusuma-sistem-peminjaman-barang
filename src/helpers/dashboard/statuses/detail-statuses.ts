import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const detailStatuses = (id: number, isClicked: boolean) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(
    ["detail-statuses", id],
    async () => {
      const { data } = await axios.get(`/api/dashboard/statuses/detail/${id}`, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
    {
      enabled: isClicked,
    }
  );
};
