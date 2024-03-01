export const InputPriceFormat = (price: string) => {
  const comma = (str: string) => {
    str = String(str);
    return str.replaceAll(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  };
  const uncomma = (str: string) => {
    str = String(str);
    return str.replaceAll(/[^\d]+/g, "");
  };
  return comma(uncomma(price));
};
