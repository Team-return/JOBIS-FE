/** data 객체와 name 문자열을 받아서, data 객체 내에 name 값에 해당하는 키을 반환하는 함수입니다. */
export const getValueByKey = (
  obj: Record<string, string | boolean | null>,
  value: string | boolean | null
) => {
  const foundKey = Object.keys(obj).find(key => obj[key] === value);
  return foundKey === undefined ? "" : foundKey;
};
