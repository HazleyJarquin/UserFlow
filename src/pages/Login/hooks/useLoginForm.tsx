import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebaseConfig";
import { useAuthToken } from "@/store/useAuthTokenStore";

type Props = {
  onLoginSuccess?: () => void;
};

export const useLoginForm = ({ onLoginSuccess }: Props) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setToken } = useAuthToken();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("El correo es requerido"),
    password: yup
      .string()
      .min(6, "Mínimo 6 caracteres")
      .required("La contraseña es requerida"),
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      setToken(idToken);

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(formik.dirty && formik.isValid);
  }, [formik.dirty, formik.isValid]);

  return {
    formik,
    isSubmitting,
    isDirty,
    error,
  };
};
