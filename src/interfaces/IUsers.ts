export interface IUsers {
  name: string;
  fields: {
    username: { stringValue: string };
    email: { stringValue: string };
    name: { stringValue: string };
    roleId: { integerValue: string };
    status: { booleanValue: boolean };
    createAt: { timestampValue: string };
  };
  updateTime: string;
}
