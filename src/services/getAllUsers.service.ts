import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllUsers = async (): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data?.documents;
};
