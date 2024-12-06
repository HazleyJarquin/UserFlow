/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from "formik";
import { Input } from "../ui/input";
import { AlertFormikMessage } from "../AlertFormikMessage";
import { useState } from "react";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface Props {
  formik: FormikProps<any>;
  formikKey: string;
  label: string;
  htmlFor: string;
  type: "password" | "email" | "text";
  placheholder: string;
}

export const FormikField = ({
  formik,
  formikKey,
  label,
  htmlFor,
  type,
  placheholder,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const error =
    formik.touched[formikKey] && typeof formik.errors[formikKey] === "string"
      ? formik.errors[formikKey]
      : undefined;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;
  return (
    <div className="mb-4 w-full">
      <div className="flex w-full  flex-col">
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        <div className="flex gap-2 w-full">
          <Input
            className="w-full"
            id={htmlFor}
            value={formik.values[formikKey]}
            name={formikKey}
            type={inputType}
            placeholder={placheholder}
            onChange={(e) => {
              formik.setFieldValue(formikKey, e.target.value);
              formik.validateField(formikKey);
            }}
            onBlur={(e) => {
              if (e.target instanceof HTMLInputElement) {
                formik.setFieldValue(formikKey, e.target.value);
              }

              formik.handleBlur(formikKey)(e);
            }}
          />
          {type === "password" && (
            <Button type="button" onClick={handleShowPassword}>
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          )}
        </div>
      </div>

      {formik.touched[formikKey] && formik.errors[formikKey] ? (
        <AlertFormikMessage message={error} />
      ) : null}
    </div>
  );
};
