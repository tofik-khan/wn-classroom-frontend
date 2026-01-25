export const isEmptyObject = (obj) => {
  return obj && typeof obj === "object" && Object.keys(obj).length === 0;
};
