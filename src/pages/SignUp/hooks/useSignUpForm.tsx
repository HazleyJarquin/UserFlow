import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { IUsers } from "@/interfaces/IUsers";
import { useGetAllUsers } from "@/hooks/useGetAllUsers";

interface Props {
  onSuccess: () => void;
}

export const useSignUpForm = ({ onSuccess }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: usersData } = useGetAllUsers();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("El correo es requerido")
      .test(
        "email-exists",
        "El correo electrónico ya está registrado",
        (value) =>
          !usersData?.some(
            (user: IUsers) =>
              user.fields.email.stringValue.toLowerCase() ===
              value?.toLowerCase()
          )
      ),
    password: yup
      .string()
      .min(6, "Mínimo 6 caracteres")
      .required("La contraseña es requerida"),
    name: yup.string().required("El nombre es requerido"),
    username: yup
      .string()
      .required("El username es requerido")
      .test(
        "username-exists",
        "El nombre de usuario ya existe",
        (value) =>
          !usersData?.some(
            (user: IUsers) =>
              user.fields.username.stringValue.toLowerCase() ===
              value?.toLowerCase()
          )
      ),
    roleId: yup
      .number()
      .required("El rol es requerido")
      .notOneOf([0], "Selecciona un rol válido"),
  });

  const handleSignUp = async (values: {
    email: string;
    password: string;
    username: string;
    name: string;
    roleId: number;
  }) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        username: values.username,
        email: values.email,
        name: values.name,
        password: values.password,
        status: true,
        createAt: new Date(),
        roleId: values.roleId,
      });

      onSuccess();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      roleId: 0,
      username: "",
    },
    validationSchema,
    onSubmit: handleSignUp,
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
