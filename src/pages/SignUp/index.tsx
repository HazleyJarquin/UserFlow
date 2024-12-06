import { useNavigate } from "react-router-dom";
import { useSignUpForm } from "./hooks/useSignUpForm";

import { SignUpForm } from "@/components/SignUpForm";

export const Signup = () => {
  const navigate = useNavigate();
  const { formik, isDirty, isSubmitting, error } = useSignUpForm({
    onSuccess: () => {
      navigate("/login");
    },
  });

  return (
    <SignUpForm
      error={error}
      formik={formik}
      isDirty={isDirty}
      isSubmitting={isSubmitting}
      showHaveAccount
      title={"Registrar"}
      mainClassName="min-h-screen bg-gray-100 flex justify-center items-center py-10 shadow-xl"
    />
  );
};
