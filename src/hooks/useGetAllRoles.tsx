import { getAllRoles } from "@/services/getAllRoles.service";
import { useQuery } from "react-query";

export const useGetAllRoles = () => {
  return useQuery(["getAllRoles"], {
    async queryFn() {
      return getAllRoles();
    },
  });
};
