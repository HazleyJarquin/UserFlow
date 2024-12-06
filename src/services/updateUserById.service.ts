import { IUsers } from "@/interfaces/IUsers";
import axios from "axios";

export const editUser = async (
  userId: string,
  updatedData: Partial<IUsers["fields"]>
): Promise<IUsers> => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/users/${userId}`,
      { fields: updatedData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data as IUsers;
  } catch (error) {
    console.error("Error editing user:", error);
    throw new Error("Error editing user");
  }
};
