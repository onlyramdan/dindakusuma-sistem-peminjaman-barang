import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const detailBooks = (id: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(["detail-books", id], async () => {
    const { data } = await axios.get(`/api/dashboard/books/detail/${id}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return data.data;
  });
};
