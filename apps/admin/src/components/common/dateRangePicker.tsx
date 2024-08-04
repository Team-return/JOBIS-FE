import { DateArrowIcon, DoubleArrowIcon, WaveIcon } from "@/assets/images";
import { themes } from "@jobis/design-token";
import { styled } from "styled-components";
import { Icon, Text } from "@jobis/ui";
import { BigButton, Stack } from "@/components";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDidMountEffect } from "@/hooks";

type PropsType = {
  startDate: string | null;
  endDate: string | null;
  disabled: boolean;
  changeHandler: ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => void;
};

type DateType = {
  year: string | number;
  month: string | number;
  date: string | number;
};

export const DateRangePicker = ({
  startDate,
  endDate,
  disabled,
  changeHandler,
}: PropsType) => {
  const todayDate = new Date();

  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState({
    year: todayDate.getFullYear(),
    month: todayDate.getMonth() + 1,
  });

  const [selectDate, setSelectDate] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: {
      year: "",
      month: "",
      date: "",
    },
    endDate: {
      year: "",
      month: "",
      date: "",
    },
  });

  const lastDate = new Date(currentDate.year, currentDate.month, 0);
  const beforeLastDate = new Date(currentDate.year, currentDate.month - 1, 0);

  const dateClickHandler = (year: number, month: number, date: number) => {
    const clickDate = new Date(year, month - 1, date);
    const { startDate: start } = selectDate;
    if (!start.year) {
      setSelectDate({
        startDate: { year, month, date },
        endDate: { year, month, date },
      });
    } else if (
      clickDate < new Date(`${startDate}T00:00:00`) ||
      clickDate.getTime() === new Date(`${endDate}T00:00:00`).getTime()
    ) {
      setSelectDate(prev => ({ ...prev, startDate: { year, month, date } }));
    } else {
      setSelectDate(prev => ({ ...prev, endDate: { year, month, date } }));
    }
  };

  const getDateFormatted = (dateObj: DateType) => {
    return `${dateObj.year}-${dateObj.month.toString().padStart(2, "0")}-${dateObj.date.toString().padStart(2, "0")}`;
  };

  const getDateParts = (dateString: string | null) => {
    if (!dateString) {
      return { year: "", month: "", date: "" };
    }
    const [year, month, date] = dateString.split("-");
    return { year, month, date };
  };

  const isValidDate = (dateObj: DateType) =>
    Object.values(dateObj).every(part => !!part);

  useEffect(() => {
    setSelectDate({
      startDate: getDateParts(startDate),
      endDate: getDateParts(endDate),
    });
  }, [endDate, startDate]);

  useDidMountEffect(() => {
    if (isValidDate(selectDate.startDate) && isValidDate(selectDate.endDate)) {
      changeHandler({
        startDate: getDateFormatted(selectDate.startDate),
        endDate: getDateFormatted(selectDate.endDate),
      });
    }
  }, [selectDate]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsShow(false);
      }}
    >
      <Stack
        width={350}
        justify="space-between"
        align="center"
        position="relative"
      >
        <DateViewer
          $disabled={disabled}
          onClick={() => {
            !disabled && setIsShow(prev => !prev);
          }}
        >
          <Text
            fontSize="body2"
            fontWeight="regular"
            color={
              disabled || !startDate
                ? themes.Color.grayScale[50]
                : themes.Color.grayScale[60]
            }
          >
            {disabled || !startDate ? "yyyy.mm.dd" : startDate}
          </Text>
          <Icon
            icon="Date"
            size={16}
            color={
              disabled ? themes.Color.grayScale[50] : themes.Color.grayScale[90]
            }
            style={{ marginTop: "4px" }}
          />
        </DateViewer>
        <img src={WaveIcon} />
        <DateViewer
          $disabled={disabled}
          onClick={() => {
            !disabled && setIsShow(prev => !prev);
          }}
        >
          <Text
            fontSize="body2"
            fontWeight="regular"
            color={
              disabled || !startDate
                ? themes.Color.grayScale[50]
                : themes.Color.grayScale[60]
            }
          >
            {disabled || !endDate ? "yyyy.mm.dd" : endDate}
          </Text>
          <Icon
            icon="Date"
            size={16}
            color={
              disabled ? themes.Color.grayScale[50] : themes.Color.grayScale[90]
            }
            style={{ marginTop: "4px" }}
          />
        </DateViewer>
        {isShow && (
          <DatePicker>
            <Stack width="100%" justify="space-between">
              <Stack align="center" gap={8}>
                <ArrowIcon
                  src={DoubleArrowIcon}
                  alt="doubleArrowIcon"
                  onClick={() => {
                    setCurrentDate(prev => ({ ...prev, year: prev.year - 1 }));
                  }}
                />
                <ArrowIcon
                  src={DateArrowIcon}
                  alt="arrowIcon"
                  onClick={() => {
                    setCurrentDate(prev => ({
                      year: prev.month === 1 ? prev.year - 1 : prev.year,
                      month: prev.month === 1 ? 12 : prev.month - 1,
                    }));
                  }}
                />
              </Stack>
              <Text fontSize="h6" fontWeight="bold">
                {`${currentDate.year}.${currentDate.month.toString().padStart(2, "0")}`}
              </Text>
              <Stack justify="flex-end" align="center" gap={8}>
                <ArrowIcon
                  src={DateArrowIcon}
                  alt="arrowIcon"
                  style={{ rotate: "180deg" }}
                  onClick={() => {
                    setCurrentDate(prev => ({
                      year: prev.month === 12 ? prev.year + 1 : prev.year,
                      month: prev.month === 12 ? 1 : prev.month + 1,
                    }));
                  }}
                />
                <ArrowIcon
                  src={DoubleArrowIcon}
                  alt="doubleArrowIcon"
                  style={{ rotate: "180deg" }}
                  onClick={() => {
                    setCurrentDate(prev => ({ ...prev, year: prev.year + 1 }));
                  }}
                />
              </Stack>
            </Stack>
            <DateWrapper>
              {Array.from({ length: beforeLastDate.getDay() + 1 }, (_, idx) => (
                <DateCell key={idx} disabled={true}>
                  {beforeLastDate.getDate() - idx}
                </DateCell>
              )).reverse()}
              {Array.from({ length: lastDate.getDate() }, (_, idx) => (
                <DateCell
                  key={idx}
                  onClick={() => {
                    dateClickHandler(
                      currentDate.year,
                      currentDate.month,
                      idx + 1
                    );
                  }}
                  $isSelect={
                    getDateFormatted({
                      ...currentDate,
                      date: idx + 1,
                    }) === startDate ||
                    getDateFormatted({
                      ...currentDate,
                      date: idx + 1,
                    }) === endDate
                  }
                  $isPeriod={
                    new Date(currentDate.year, currentDate.month - 1, idx + 1) >
                      new Date(`${startDate}T00:00:00`) &&
                    new Date(currentDate.year, currentDate.month - 1, idx + 1) <
                      new Date(`${endDate}T00:00:00`)
                  }
                >
                  {idx + 1}
                </DateCell>
              ))}
              {Array.from({ length: 6 - lastDate.getDay() }, (_, idx) => (
                <DateCell key={idx} disabled={true}>
                  {idx + 1}
                </DateCell>
              ))}
            </DateWrapper>
            <Stack justify="flex-end">
              <BigButton
                variant="primary"
                width={92}
                height={40}
                onClick={() => {
                  setIsShow(false);
                }}
              >
                <Text fontSize="body2" fontWeight="bold">
                  확인
                </Text>
              </BigButton>
            </Stack>
          </DatePicker>
        )}
      </Stack>
    </OutsideClickHandler>
  );
};

const DateViewer = styled.div<{ $disabled: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 151px;
  height: 48px;
  padding: 12px;
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[20]};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

const DatePicker = styled.div`
  position: absolute;
  top: 52px;
  left: -24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 398px;
  padding: 23px 22px;
  border-radius: 16px;

  background-color: ${themes.Color.grayScale[10]};
  box-shadow: 0 4px 20px 0 rgb(112 144 176 / 12%);
  gap: 24px;
`;

const DateWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 36px);
  grid-gap: 2px 5px;
`;

const DateCell = styled.button<{ $isSelect?: boolean; $isPeriod?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 36px;
  border: 1px solid
    ${({ $isSelect, $isPeriod }) =>
      $isSelect
        ? themes.Color.primary[20]
        : $isPeriod
          ? themes.Color.subColor.blue[10]
          : themes.Color.grayScale[40]};
  border-radius: 8px;

  background-color: ${({ $isSelect, $isPeriod }) =>
    $isSelect
      ? themes.Color.primary[20]
      : $isPeriod
        ? themes.Color.subColor.blue[10]
        : themes.Color.grayScale[10]};

  color: ${({ $isSelect, $isPeriod }) =>
    $isSelect
      ? themes.Color.grayScale[10]
      : $isPeriod
        ? themes.Color.subColor.blue[20]
        : themes.Color.grayScale[60]};
  font-size: ${themes.Font.body2};
  font-weight: ${themes.FontWeight.medium};
  cursor: pointer;

  &:hover {
    border: 1px solid ${themes.Color.primary[20]};

    background-color: ${themes.Color.grayScale[10]};

    color: ${themes.Color.primary[20]};
  }

  &:disabled {
    border: 1px solid ${themes.Color.grayScale[40]};

    background-color: ${themes.Color.grayScale[30]};

    color: ${themes.Color.grayScale[50]};
    cursor: not-allowed;
  }

  &:disabled:hover {
    border: 1px solid ${themes.Color.grayScale[40]};

    background-color: ${themes.Color.grayScale[30]};

    color: ${themes.Color.grayScale[50]};
  }
`;

const ArrowIcon = styled.img`
  cursor: pointer;
`;
