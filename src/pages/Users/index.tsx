import { DataTable } from "@/components/DataTable";
import { useDataAndColums } from "./hooks/useDataAndColums";
import { useState } from "react";
import { useEditUser } from "@/hooks/useUpdateUser";
import { IUsers } from "@/interfaces/IUsers";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import { EditUserDialog } from "./components/EditUserDialog";
import { useToast } from "@/hooks/use-toast";
import { useDeleteUser } from "@/hooks/useGetDeleteUserById";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { AddUserDialog } from "./components/AddUserDialog";
import { useAuthToken } from "@/store/useAuthTokenStore";

export const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedData, setUpdatedData] = useState<Partial<IUsers["fields"]>>({
    username: { stringValue: "" },
    email: { stringValue: "" },
    status: { booleanValue: true },
  });
  const { mutate: editUser, isLoading } = useEditUser();

  const { refetch } = useGetAllUsers();

  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();

  const { columns, data } = useDataAndColums({
    editUser(id, userData) {
      setEditingId(id);
      setUpdatedData(userData);
      setIsOpen(true);
    },
    isUpdating: isLoading,
    deleteUser(id) {
      deleteUser(id);
      setTimeout(() => {
        refetch();
      }, 1000);
    },
    isDeleting: isDeleting,
  });

  const { data: usersData } = useGetAllUsers();
  const { tokenDecoded } = useAuthToken();

  const handleFindRoleByEmail = (email: string) => {
    const user = usersData?.find(
      (u: IUsers) => u.fields.email.stringValue === email
    );
    return user ? user.fields.roleId.integerValue : "Usuario no encontrado";
  };

  const permission = handleFindRoleByEmail(
    tokenDecoded ? tokenDecoded.email : ""
  );

  const handleEditSubmit = () => {
    if (!editingId) return;

    editUser(
      { userId: editingId, updatedData },
      {
        onSuccess: () => {
          toast({
            title: "Usuario editado correctamente",
            description: "El usuario ha sido editado correctamente",
          });
          setTimeout(() => {
            refetch();
          }, 1000);
          setEditingId(null);
          setUpdatedData({});
        },
        onError: (error) => {
          console.error("Error editing user:", error);
          toast({
            title: "Error al editar usuario",
            description: "Ha ocurrido un error al editar el usuario",
          });
        },
      }
    );
  };

  return (
    <div className="w-full h-[100vh] flex flex-col gap-2 p-2">
      <div className="flex justify-end">
        <Button
          disabled={permission !== "1"}
          onClick={() => setShowAddUserDialog(true)}
        >
          <PlusIcon />
          Agregar Usuario
        </Button>
      </div>
      <DataTable
        columnToSearchData="username"
        columns={columns}
        data={data}
        inputPlaceHolder="Buscar usuario"
        nextButtonPaginationText="Siguiente"
        noResultText="No found"
        previousButtonPaginationText="Anterior"
      />

      {showAddUserDialog && (
        <AddUserDialog
          isOpen={showAddUserDialog}
          setIsOpen={setShowAddUserDialog}
          refetch={refetch}
        />
      )}
      {isOpen && editingId && (
        <EditUserDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSaveChanges={handleEditSubmit}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
