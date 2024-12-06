export const handleFindRoleById = (
  id: string,
  rolesData: Array<{
    fields: {
      id: { integerValue: string };
      description: { stringValue: string };
    };
  }>
): string => {
  const role = rolesData?.find(
    (r) => r.fields.id.integerValue.toString() === id
  );

  return role ? role.fields.description.stringValue : "Rol no encontrado";
};
