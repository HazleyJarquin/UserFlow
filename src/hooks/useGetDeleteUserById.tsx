import { deleteUser } from "@/services/deleteUserById.service";
import { useMutation } from "react-query";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      console.log("User deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};
