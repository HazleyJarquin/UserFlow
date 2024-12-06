import { Button } from "@/components/ui/button";
import { useGetAllRoles } from "@/hooks/useGetAllRoles";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";

import { IUsers } from "@/interfaces/IUsers";
import { useAuthToken } from "@/store/useAuthTokenStore";
import { formatFirebaseTimestamp } from "@/utils/formatFirebaseTimestamp";
import { handleFindRoleById } from "@/utils/handleFindRoleById";
import { CellContext } from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";

interface Props {
  editUser: (id: string, userData: Partial<IUsers["fields"]>) => void;
  isUpdating: boolean;
  deleteUser: (id: string) => void;
  isDeleting: boolean;
}

export const useDataAndColums = ({
  editUser,
  isUpdating,
  deleteUser,
  isDeleting,
}: Props) => {
  const { data: rolesData } = useGetAllRoles();
  const { data: usersData } = useGetAllUsers();
  const { tokenDecoded } = useAuthToken();

  console.log("usersData", usersData);

  const getUserIdFromDocumentPath = (documentPath: string): string => {
    const parts = documentPath.split("users/");
    if (parts.length > 1) {
      return parts[1];
    }
    throw new Error("El documento no tiene un ID válido");
  };

  const handleFindRoleByEmail = (email: string) => {
    const user = usersData?.find(
      (u: IUsers) => u.fields.email.stringValue === email
    );
    return user ? user.fields.roleId.integerValue : "Usuario no encontrado";
  };

  const permission = handleFindRoleByEmail(
    tokenDecoded ? tokenDecoded.email : ""
  );

  const data =
    usersData?.map((user: IUsers) => ({
      id: getUserIdFromDocumentPath(user.name),
      username: user.fields.username.stringValue,
      rol: handleFindRoleById(user.fields.roleId.integerValue, rolesData),
      emails: user.fields.email.stringValue,
      createAt: formatFirebaseTimestamp(user.fields.createAt.timestampValue),
      updateTime: formatFirebaseTimestamp(user.updateTime),
    })) || [];

  const columns = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "N. Usuario",
      accessorKey: "username",
    },
    {
      header: "Rol",
      accessorKey: "rol",
    },
    {
      header: "Correo",
      accessorKey: "emails",
    },
    {
      header: "Creado",
      accessorKey: "createAt",
    },
    {
      header: "Actualizado",
      accessorKey: "updateTime",
    },
    {
      header: "Acciones",
      accessorKey: "actions",
      cell: ({ row }: CellContext<IUsers, unknown>) => {
        const id = row.getValue("id") as string;
        const userData = usersData?.find(
          (u: IUsers) => getUserIdFromDocumentPath(u.name) === id
        );

        return (
          <div className="flex gap-2 items-center">
            <Button
              disabled={isDeleting || permission !== "1"}
              onClick={() => deleteUser(id)}
            >
              <TrashIcon />
            </Button>
            <Button
              disabled={isDeleting || isUpdating || permission !== "1"}
              onClick={() => {
                if (userData) {
                  editUser(id, userData.fields);
                }
              }}
            >
              <EditIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return { data, columns };
};
