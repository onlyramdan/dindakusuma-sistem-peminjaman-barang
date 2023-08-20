import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getUsers = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/dashboard/users", {
        headers: {
          "Cache-Control": "no-store",
        },
      });
      return data.data;
    },
  });
};
