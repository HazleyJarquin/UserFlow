import { FormikProps } from "formik";
import { AlertFormikMessage } from "../../../../components/AlertFormikMessage";
import { useGetAllRoles } from "@/hooks/useGetAllRoles";
import { IRoles } from "@/interfaces/IRoles";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
}

export const DropdownRoleField = ({ formik }: Props) => {
  const { data: roles } = useGetAllRoles();

  return (
    <div className="mb-6">
      <label
        htmlFor="role"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        Role
      </label>

      <select
        onChange={(e) => {
          formik.setFieldValue("roleId", Number(e.target.value));
          formik.validateField("roleId");
        }}
        onBlur={(e) => {
          if (e.target instanceof HTMLSelectElement) {
            formik.setFieldValue("roleId", Number(e.target.value));
          }
          formik.handleBlur("roleId")(e);
        }}
        value={formik.values.roleId}
        id="role"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Selecciona un rol
        </option>
        {roles?.map((r: IRoles) => (
          <option
            key={r.fields.id.integerValue}
            value={r.fields.id.integerValue}
          >
            {r.fields.description.stringValue}
          </option>
        ))}
      </select>

      {formik.touched.roleId && formik.errors.roleId && (
        <AlertFormikMessage
          message={
            typeof formik.errors.roleId === "string"
              ? formik.errors.roleId
              : undefined
          }
        />
      )}
    </div>
  );
};
