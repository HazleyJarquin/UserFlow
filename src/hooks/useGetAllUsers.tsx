import { getAllUsers } from "@/services/getAllUsers.service";
import { useQuery } from "react-query";

export const useGetAllUsers = () => {
  return useQuery(["getAllUsers"], {
    async queryFn() {
      return getAllUsers();
    },
  });
};
