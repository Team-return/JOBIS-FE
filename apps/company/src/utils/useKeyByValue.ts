export const KeyByValue = <T extends Record<string, string>, K>(object: T, value: K) => {
  return Object.keys(object).find((key) => object[key] === value);
};
