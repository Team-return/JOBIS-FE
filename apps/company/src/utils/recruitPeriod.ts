const pad = (value: number) => value.toString().padStart(2, "0");

/** 오늘 날짜를 모집기간 입력값과 같은 yyyy-mm-dd 형태로 돌려준다 */
export const getTodayDateString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
};

// 2026-02-30처럼 형식만 맞고 없는 날짜를 거른다
const isRealDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

interface StartDateOptions {
  alwaysRecruit: boolean;
  /** 수정 화면에서 이미 저장된 시작일. 진행 중인 모집은 지난 시작일을 그대로 둘 수 있다 */
  savedDate?: string;
}

/** yyyy-mm-dd는 글자 순서가 날짜 순서와 같아 문자열로 비교한다 */
export const validateStartDate = (
  value: string | undefined,
  { alwaysRecruit, savedDate }: StartDateOptions
) => {
  if (alwaysRecruit || !value) {
    return true;
  }
  if (!isRealDate(value)) {
    return "존재하지 않는 날짜입니다.";
  }
  if (value === savedDate) {
    return true;
  }
  return value >= getTodayDateString() || "오늘 이후 날짜를 입력해주세요.";
};

export const validateEndDate = (
  value: string | undefined,
  startDate: string | undefined,
  alwaysRecruit: boolean
) => {
  if (alwaysRecruit || !value) {
    return true;
  }
  if (!isRealDate(value)) {
    return "존재하지 않는 날짜입니다.";
  }
  if (value < getTodayDateString()) {
    return "오늘 이후 날짜를 입력해주세요.";
  }
  return (
    !startDate || value >= startDate || "모집 시작일 이후 날짜를 입력해주세요."
  );
};
