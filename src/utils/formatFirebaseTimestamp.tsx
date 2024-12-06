export const formatFirebaseTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;

  return `${day}/${month}/${year}`;
};
