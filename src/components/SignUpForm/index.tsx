import { NavLink } from "react-router-dom";
import { FormikField } from "../FormikField";
import { Button } from "../ui/button";
import { DropdownRoleField } from "./components/DropdownRoleField";
import { FormikProps } from "formik";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  isDirty: boolean;
  isSubmitting: boolean;
  error: string | null;
  showHaveAccount: boolean;
  title: string;
  mainClassName?: string;
}

export const SignUpForm = ({
  error,
  formik,
  isDirty,
  isSubmitting,
  showHaveAccount,
  title,
  mainClassName,
}: Props) => {
  return (
    <main className={mainClassName}>
      <div>
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          {title}
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <FormikField
            formik={formik}
            formikKey="username"
            htmlFor="username"
            label="Usuario"
            placheholder="Nombre de usuario"
            type="text"
          />
          <FormikField
            formik={formik}
            formikKey="email"
            htmlFor="email"
            label="Correo Electrónico"
            placheholder="email@email.com"
            type="email"
          />
          <FormikField
            formik={formik}
            formikKey="password"
            htmlFor="password"
            label="Contraseña"
            placheholder="Contraseña"
            type="password"
          />

          <FormikField
            formik={formik}
            formikKey="name"
            htmlFor="name"
            label="Nombre Completo"
            placheholder="Nombre Completo"
            type="text"
          />

          <DropdownRoleField formik={formik} />

          <Button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={!isDirty || isSubmitting || !formik.isValid}
          >
            Registrar
          </Button>
        </form>

        {showHaveAccount && (
          <p className="mt-6 text-center text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <NavLink to="/login" className="text-blue-600 hover:text-blue-800">
              Iniciar sesión
            </NavLink>
          </p>
        )}

        {error && (
          <div className="bg-red-200 text-red-700 p-2 mt-4 rounded-md">
            {error}
          </div>
        )}
      </div>
    </main>
  );
};
