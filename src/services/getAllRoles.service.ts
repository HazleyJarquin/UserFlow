import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllRoles = async (): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/roles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data?.documents;
};
