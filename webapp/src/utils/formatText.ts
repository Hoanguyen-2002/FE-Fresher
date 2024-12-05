export const formatCategory = (value: string) => {
  if (value.length <= 2) return value
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatCamelCase = (value: string) => {
  return value
};
