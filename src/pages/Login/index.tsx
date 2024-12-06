import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "./hooks/useLoginForm";
import { FormikField } from "@/components/FormikField";

export const Login = () => {
  const { formik, isSubmitting, isDirty, error } = useLoginForm({});

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Inicio de Sesión
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <FormikField
            formik={formik}
            formikKey={"email"}
            label={"Correo Electrónico"}
            htmlFor={"email"}
            type={"email"}
            placheholder={"email@email.com"}
          />

          <FormikField
            formik={formik}
            formikKey={"password"}
            label={"Contraseña"}
            htmlFor={"password"}
            type={"password"}
            placheholder={"******"}
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition-colors duration-300"
            disabled={isSubmitting || !isDirty}
          >
            Iniciar Sesion
          </Button>
        </form>

        <p className="text-sm text-center mt-2 text-gray-600">
          <NavLink
            to="/forgot-password"
            className="text-indigo-500 hover:underline"
          >
            Olvidaste tu contraseña?
          </NavLink>
        </p>

        <p className="mt-4 text-sm text-center text-gray-600">
          No tienes cuenta?{" "}
          <NavLink to="/signup" className="text-indigo-500 hover:underline">
            Registrarse
          </NavLink>
        </p>
        {error && (
          <div className="bg-red-200 text-red-700 p-2 mt-4 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
