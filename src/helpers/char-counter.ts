export const charCounter = (str: string, limit: number) => {
  if (str) {
    if (str.length < limit) {
      return limit - str.length;
    } else {
      return 0;
    }
  } else {
    return limit;
  }
};
