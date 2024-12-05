export const formatId = (value?: string) => {
  if (!value) return ""
  return value?.split("-")[0].toUpperCase();
};
