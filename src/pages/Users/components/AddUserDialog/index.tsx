import { SignUpForm } from "@/components/SignUpForm";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

import { useSignUpForm } from "@/pages/SignUp/hooks/useSignUpForm";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refetch: () => void;
}

export const AddUserDialog = ({ isOpen, setIsOpen, refetch }: Props) => {
  const { toast } = useToast();
  const { formik, isDirty, isSubmitting, error } = useSignUpForm({
    onSuccess: () => {
      setIsOpen(false);
      toast({
        title: "Usuario agregado correctamente",
        description: "El usuario ha sido agregado correctamente",
      });
      setTimeout(() => {
        refetch();
      }, 1000);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <SignUpForm
          error={error}
          formik={formik}
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          showHaveAccount={false}
          title="Agregar Usuario"
        />
      </DialogContent>
    </Dialog>
  );
};
