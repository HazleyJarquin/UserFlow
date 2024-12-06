import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";
import { IUsers } from "@/interfaces/IUsers";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleSaveChanges: () => void;
  updatedData: Partial<IUsers["fields"]>;
  setUpdatedData: React.Dispatch<
    React.SetStateAction<Partial<IUsers["fields"]>>
  >;
  isLoading: boolean;
}

export const EditUserDialog = ({
  isOpen,
  setIsOpen,
  handleSaveChanges,
  updatedData,
  setUpdatedData,
  isLoading,
}: Props) => {
  const { data: usersData } = useGetAllUsers();
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
  });

  const validateField = (field: "username" | "email", value: string) => {
    if (field === "username") {
      const exists = usersData?.some(
        (user: IUsers) =>
          user.fields.username.stringValue.toLowerCase() === value.toLowerCase()
      );
      setErrorMessages((prev) => ({
        ...prev,
        username: exists ? "El nombre de usuario ya existe" : "",
      }));
    }

    if (field === "email") {
      const exists = usersData?.some(
        (user: IUsers) =>
          user.fields.email.stringValue.toLowerCase() === value.toLowerCase()
      );
      setErrorMessages((prev) => ({
        ...prev,
        email: exists ? "El correo electrónico ya está registrado" : "",
      }));
    }
  };

  const handleChange = (
    field: "username" | "email" | "status",
    value: string | boolean
  ) => {
    setUpdatedData((prev) => ({
      ...prev,
      [field]:
        field === "status" ? { booleanValue: value } : { stringValue: value },
    }));

    if (field === "username" || field === "email") {
      validateField(field, value as string);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              N. Usuario
            </label>
            <div className="col-span-3">
              <Input
                id="username"
                value={updatedData?.username?.stringValue || ""}
                onChange={(e) => handleChange("username", e.target.value)}
                disabled={isLoading}
              />
              {errorMessages.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errorMessages.username}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              Correo
            </label>
            <div className="col-span-3">
              <Input
                id="email"
                type="email"
                value={updatedData?.email?.stringValue || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={isLoading}
              />
              {errorMessages.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errorMessages.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right">
              Estado
            </label>
            <select
              id="status"
              value={updatedData?.status?.booleanValue ? "true" : "false"}
              onChange={(e) =>
                handleChange("status", e.target.value === "true")
              }
              disabled={isLoading}
              className="col-span-3"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSaveChanges}
            disabled={
              isLoading ||
              !updatedData.username?.stringValue ||
              !updatedData.email?.stringValue ||
              !!errorMessages.username ||
              !!errorMessages.email
            }
          >
            {isLoading ? "Cargando..." : "Guardar cambios"}
          </Button>
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
