import {
  Button,
  Checkbox,
  DateRangePicker,
  Dropdown,
  Input,
  Stack,
} from "@/components";
import { useRecruitmentFilter, useSelectRecruitmentId } from "@/stores";
import { useChangeRecruitmentsStatus } from "@/apis";
import { useState } from "react";
import type { RecruitmentStatusKrType } from "@@types/types";
import { CompanyStatusKrToEn } from "@@types/enums";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Icon, Text } from "@jobis/ui";
import { ChevronIcon, Rollback } from "@assets/images";
import { styled } from "styled-components";
import { themes } from "@jobis/design-token";
import OutsideClickHandler from "react-outside-click-handler";
import { useDidMountEffect } from "@/hooks";

export const RecruitmentFilter = () => {
  const date = new Date();
  const iYear = date.getFullYear();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<RecruitmentStatusKrType>("전체");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rollbackRotate, setRollbackRotate] = useState<number>(0);

  const [isAlways, setIsAlways] = useState<boolean>(false);

  const {
    recruitmentFilter,
    setDropdownRecruitmentFilter,
    setInputRecruitmentFilter,
    resetRecruitmentFilter,
  } = useRecruitmentFilter();

  const { selectRecruitmentId, resetSelectRecruitmentId } =
    useSelectRecruitmentId();

  const { mutate, isPending } = useChangeRecruitmentsStatus(
    CompanyStatusKrToEn[status!] || "DONE",
    selectRecruitmentId,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllRecruitmentForm"] });
        resetSelectRecruitmentId();
        toast.success("모집의뢰 상태 변경에 성공하였습니다.");
      },
    }
  );

  useDidMountEffect(() => {
    if (isAlways) {
      setDropdownRecruitmentFilter("startDate", null);
      setDropdownRecruitmentFilter("endDate", null);
    } else if (!isAlways) {
      setDropdownRecruitmentFilter("startDate", "");
      setDropdownRecruitmentFilter("endDate", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlways, rollbackRotate]);

  return (
    <Stack justify="space-between" align="center" margin="16px 0 24px 0">
      <Stack align="center" gap={8}>
        <Stack width={95} position="relative">
          <OutsideClickHandler
            onOutsideClick={() => {
              setIsOpen(false);
            }}
          >
            <Stack position="relative" width={95}>
              <DateWrapper
                onClick={() => {
                  setIsOpen(prev => !prev);
                }}
              >
                <Text
                  fontSize="body3"
                  fontWeight="regular"
                  color={
                    recruitmentFilter.startDate === ""
                      ? themes.Color.grayScale[60]
                      : themes.Color.primary[20]
                  }
                >
                  {recruitmentFilter.startDate === null
                    ? "상시모집"
                    : "모집기간"}
                </Text>
                <ChevronImg
                  $isopen={isOpen}
                  stroke={themes.Color.grayScale[60]}
                />
              </DateWrapper>
            </Stack>
            {isOpen && (
              <DateBox>
                <Stack align="center" margin="0 0 16px 0">
                  <Stack align="center" gap={8}>
                    <Text fontSize="h6" fontWeight="bold">
                      모집기간
                    </Text>
                    <StyleRollbackIcon
                      stroke={themes.Color.grayScale[90]}
                      $rollbackRotate={rollbackRotate}
                      $disabled={recruitmentFilter.startDate === ""}
                      onClick={() => {
                        if (recruitmentFilter.startDate !== "") {
                          setRollbackRotate(prev => prev + 360);
                          setIsAlways(false);
                        }
                      }}
                    />
                  </Stack>
                  <Icon
                    icon="Close"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </Stack>
                <DateRangePicker
                  startDate={recruitmentFilter.startDate}
                  endDate={recruitmentFilter.endDate}
                  disabled={recruitmentFilter.startDate === null}
                  changeHandler={e => {
                    setDropdownRecruitmentFilter("startDate", e.startDate);
                    setDropdownRecruitmentFilter("endDate", e.endDate);
                  }}
                />
                <Checkbox
                  label="상시모집"
                  width="90px"
                  checked={isAlways}
                  onChange={() => {
                    setIsAlways(prev => !prev);
                  }}
                />
                <Stack justify="flex-end" margin="16px 0 0 0">
                  <Button
                    variant="primary"
                    width={90}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <Text fontSize="body3" fontWeight="bold">
                      확인
                    </Text>
                  </Button>
                </Stack>
              </DateBox>
            )}
          </OutsideClickHandler>
        </Stack>
        <Dropdown
          placeholder="모집년도"
          width={95}
          value={recruitmentFilter.year}
          options={Array.from({ length: 11 }, (_, i) => iYear - i)}
          changeHandler={item => {
            setDropdownRecruitmentFilter("year", item);
          }}
        />
        <Dropdown
          placeholder="모집구분"
          width={95}
          value={recruitmentFilter.winterIntern}
          options={["체험형", "채용형"]}
          changeHandler={item => {
            setDropdownRecruitmentFilter("winterIntern", item);
          }}
        />
        <Dropdown
          placeholder="모집상태"
          width={95}
          value={recruitmentFilter.recruitmentStatus}
          options={["전체", "모집전", "모집중", "모집종료", "접수요청"]}
          changeHandler={item => {
            setDropdownRecruitmentFilter(
              "recruitmentStatus",
              item === "전체" ? "" : item
            );
          }}
        />
        <Input
          width={280}
          placeholder="기업명을 검색하세요."
          isSearch={true}
          value={recruitmentFilter.companyName}
          name="companyName"
          onChange={setInputRecruitmentFilter}
        />
      </Stack>
      <Stack justify="flex-end" gap={8}>
        <Button
          width={142}
          disabled={
            !recruitmentFilter.companyName &&
            recruitmentFilter.winterIntern === "채용형" &&
            !recruitmentFilter.recruitmentStatus &&
            recruitmentFilter.year === new Date().getFullYear() &&
            !recruitmentFilter.startDate &&
            recruitmentFilter.startDate !== null
          }
          icon={<Rollback stroke={themes.Color.primary[20]} />}
          onClick={() => {
            resetRecruitmentFilter();
            toast.success("필터 초기화에 성공하였습니다.");
          }}
        >
          <Text fontSize="body3" fontWeight="regular">
            필터 초기화
          </Text>
        </Button>
        <Dropdown
          disabled={selectRecruitmentId.length === 0 || isPending}
          placeholder="상태변경"
          width={95}
          value={""}
          options={["모집전", "모집중", "모집종료"]}
          changeHandler={item => {
            setStatus(item as RecruitmentStatusKrType);
            mutate();
          }}
          isChangeBtn={true}
        />
      </Stack>
    </Stack>
  );
};

const DateBox = styled.div`
  position: absolute;
  top: 40px;
  display: flex;
  z-index: 1;
  flex-direction: column;
  width: 398px;
  height: 244px;
  padding: 24px;
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[10]};
  gap: 8px;
`;

const DateWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95px;
  height: 36px;
  padding: 8px;
  border: 1px solid ${themes.Color.grayScale[50]};
  border-radius: 8px;
  gap: 8px;
  cursor: pointer;
`;

const ChevronImg = styled(ChevronIcon)<{ $isopen: boolean }>`
  rotate: ${({ $isopen }) => ($isopen ? "180deg" : "0deg")};

  transition-duration: 0.5s;
`;

const StyleRollbackIcon = styled(Rollback)<{
  $rollbackRotate: number;
  $disabled: boolean;
}>`
  transform: rotate(${({ $rollbackRotate }) => `${$rollbackRotate}deg`});

  transition: 1s;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;
