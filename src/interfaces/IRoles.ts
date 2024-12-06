export interface IRoles {
  name: string;
  fields: {
    id: { integerValue: string };
    createAt: { stringValue: string };
    status: { booleanValue: boolean };
    description: { stringValue: string };
  };
}
