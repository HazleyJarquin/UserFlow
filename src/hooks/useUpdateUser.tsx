import { useMutation } from "react-query";
import { IUsers } from "@/interfaces/IUsers";
import { editUser } from "@/services/updateUserById.service";

export const useEditUser = () => {
  return useMutation({
    mutationFn: ({
      userId,
      updatedData,
    }: {
      userId: string;
      updatedData: Partial<IUsers["fields"]>;
    }) => editUser(userId, updatedData),

    onSuccess: (data) => {
      console.log("User edited successfully:", data);
    },

    onError: (error) => {
      console.error("Error editing user:", error);
    },
  });
};
