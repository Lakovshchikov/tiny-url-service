const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base = charset.length;

export const generateShortUrl = (id: number): string => {
  if (id < 0) return "";
  if (id === 0) return charset[0];

  let str = "";
  while (id > 0) {
    str = charset[id % base] + str;
    id = Math.floor(id / base);
  }
  return str;
};
