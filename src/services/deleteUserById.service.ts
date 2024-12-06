import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteUser = async (userId: string): Promise<any> => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/users/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
};
