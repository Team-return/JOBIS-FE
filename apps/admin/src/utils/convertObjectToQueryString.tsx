export const convertObjectToQueryString = <T,>(obj: Record<string, T>) => {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
      params.append(key, String(obj[key]));
    }
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};
