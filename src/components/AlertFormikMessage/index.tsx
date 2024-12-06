import { TriangleAlert } from "lucide-react";

interface Props {
  message: string | undefined;
}

export const AlertFormikMessage = ({ message }: Props) => {
  return (
    <div className="w-fit flex items-center gap-2">
      <TriangleAlert className="text-red-500" size={"1.2rem"} />
      <p className="text-red-500">{message}</p>
    </div>
  );
};
