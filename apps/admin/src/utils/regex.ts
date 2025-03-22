const regex = {
  phone_number: (value: string) =>
    value
      ?.replace(/[^0-9]/g, "")
      .replaceAll(/^(\d{2,3})(\d{3,4})(\d{4})$/g, "$1-$2-$3")
      .replaceAll(/(-{1,2})$/g, ""),
  buisness_number: (value: string) =>
    value
      ?.replace(/[^0-9]/g, "")
      .replaceAll(/^(\d{3})(\d{2})(\d{5})$/g, "$1-$2-$3")
      .replaceAll(/(-{1,2})$/g, ""),
  date_number: (value: string) =>
    value
      ?.replace(/[^0-9]/g, "")
      ?.replaceAll(/^(\d{4})(\d{2})(\d{2})$/g, "$1-$2-$3")
      .replaceAll(/(-{1,2})$/g, ""),
  money: (value: string) =>
    value
      ?.replace(/[^0-9.]/g, "")
      .replaceAll(/,/gi, "")
      .replaceAll(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
};

export const formatValue = (value: string, key: string): string => {
  if (key.includes("번호")) {
    return regex.phone_number(value);
  }
  if (key === "매출액") {
    return regex.money(value);
  }
  if (key === "설립일") {
    return regex.date_number(value);
  }
  return value;
};
