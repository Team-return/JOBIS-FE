import fs from "node:fs";

const generateThemeCss = () => {
  const cssString = `:root {
    --primary-10: #f3f3fb;
    --primary-20: #135c9d;
    --primary-30: #0f4c82;
    --primary-40: #002c53;
    --grayscale-10: #ffffff;
    --grayscale-20: #fafafa;
    --grayscale-30: #f7f7f7;
    --grayscale-40: #e5e5e5;
    --grayscale-50: #cccccc;
    --grayscale-60: #7f7f7f;
    --grayscale-70: #444444;
    --grayscale-80: #333333;
    --grayscale-90: #000000;
    --subcolor-red-10: #fce9e7;
    --subcolor-red-20: #e74c3c;
    --subcolor-green-10: #e5f8ee;
    --subcolor-green-20: #2ecc71;
    --subcolor-blue-10: #e0ebf6;
    --subcolor-blue-20: #237bc9;
    --subcolor-yellow-10: #fdf7e2;
    --subcolor-yellow-20: #f1c40f;
}

:root .theme-dark {
    --primary-10: #002559;
    --primary-20: #135c9d;
    --primary-30: #2770b1;
    --primary-40: #4f98d9;
    --grayscale-10: #000000;
    --grayscale-20: #060606;
    --grayscale-30: #191919;
    --grayscale-40: #333333;
    --grayscale-50: #545454;
    --grayscale-60: #8e8e8e;
    --grayscale-70: #d9d9d9;
    --grayscale-80: #eeeeee;
    --grayscale-90: #ffffff;
    --subcolor-red-10: #4c1914;
    --subcolor-red-20: #e74c3c;
    --subcolor-green-10: #0f4325;
    --subcolor-green-20: #2ecc71;
    --subcolor-blue-10: #0c2942;
    --subcolor-blue-20: #237bc9;
    --subcolor-yellow-10: #504105;
    --subcolor-yellow-20: #f1c40f;
}
.h1 {
    font-size: 40px;
    line-height: 60px;
}
.h2 {
    font-size: 36px;
    line-height: 54px;
}
.h3 {
    font-size: 32px;
    line-height: 48px;
}
.h4 {
    font-size: 28px;
    line-height: 40px;
}
.h5 {
    font-size: 24px;
    line-height: 36px;
}
.h6 {
    font-size: 20px;
    line-height: 26px;
}
.body1 {
    font-size: 18px;
    line-height: 24px;
}
.body2 {
    font-size: 16px;
    line-height: 22px;
}
.body3 {
    font-size: 14px;
    line-height: 20px;
}
.caption {
    font-size: 12px;
    line-height: 18px;
}

textarea {
    resize: vertical !important;
    min-height: 180px;
}

body * {
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
    `;

  fs.writeFileSync("dist/global.css", cssString);
};

generateThemeCss();
