import {
  BigButton,
  DefaultChangeStatusModal,
  Dropdown,
  FieldTrainStatusModal,
  Input,
  RejectedStatusModal,
  Stack,
} from "@/components";
import {
  useApplicationFilter,
  useFieldTrainDate,
  useModal,
  useRejectedMessage,
  useSelectApplication,
} from "@/stores";
import toast from "react-hot-toast";
import { Text } from "@jobis/ui";
import { Rollback } from "@/assets/images";
import { themes } from "@jobis/design-token";
import { useQueryClient } from "@tanstack/react-query";
import type {
  ApplicationENStatusType,
  ApplicationKRStatusType,
} from "@/@types/types";
import {
  useChangeApplicationStatus,
  useFieldTrainApplication,
  useRejectApplication,
} from "@/apis";
import { useState } from "react";
import { applicationStatus } from "@/@types/enums";
import { getValueByKey } from "@/utils";

export const ApplicationFilter = () => {
  const date = new Date();
  const iYear = date.getFullYear();

  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const [selectStatus, setSelectStatus] =
    useState<ApplicationKRStatusType>("승인");

  const {
    applicationFilter,
    setDropdownApplicationFilter,
    setInputApplicationFilter,
    resetApplicationFilter,
  } = useApplicationFilter();

  const { selectApplication, resetSelectApplication } = useSelectApplication();
  const { rejectedMessage, resetRejectedMessage } = useRejectedMessage();
  const { fieldTrainDate, resetFieldTrainDate } = useFieldTrainDate();

  const {
    mutate: fieldTrainApplicationMutate,
    isPending: fieldTrainApplicationIsPending,
  } = useFieldTrainApplication(
    fieldTrainDate,
    selectApplication.map(application => application.id),
    {
      onSuccess: () => {
        toast.success("해당 학생이 현장실습으로 변경되었습니다.");
        closeModal();
        resetRejectedMessage();
        resetSelectApplication();
        queryClient.invalidateQueries({ queryKey: ["getAllApplication"] });
      },
    }
  );

  const {
    mutate: rejectApplicationMutate,
    isPending: rejectApplicationIsPending,
  } = useRejectApplication(
    +selectApplication.map(application => application.id).join(""),
    rejectedMessage,
    {
      onSuccess: () => {
        toast.success("해당 지원서가 반려되었습니다.");
        closeModal();
        resetRejectedMessage();
        resetSelectApplication();
        queryClient.invalidateQueries({ queryKey: ["getAllApplication"] });
      },
    }
  );

  const { mutate: changeStatusMutate, isPending: changeStatusIsPening } =
    useChangeApplicationStatus(
      getValueByKey(applicationStatus, selectStatus) as ApplicationENStatusType,
      selectApplication.map(application => application.id),
      {
        onSuccess: () => {
          toast.success("해당 지원서 상태가 변경 되었습니다.");
          closeModal();
          resetSelectApplication();
          queryClient.invalidateQueries({ queryKey: ["getAllApplication"] });
        },
      }
    );

  const statusHandler = (status: ApplicationKRStatusType) => {
    switch (status) {
      case "반려":
        if (selectApplication.length === 1) {
          openModal({
            children: <RejectedStatusModal />,
            onCancel: () => {
              closeModal();
            },
            onSubmit: () => {
              rejectApplicationMutate();
            },
            onReset: () => {
              resetRejectedMessage();
            },
          });
        } else {
          toast.error("한 명만 선택해주세요.");
        }
        break;

      case "현장실습":
        openModal({
          children: <FieldTrainStatusModal />,
          onCancel: () => {
            closeModal();
          },
          onSubmit: () => {
            fieldTrainApplicationMutate();
          },
          onReset: () => {
            resetFieldTrainDate();
          },
        });
        break;

      default:
        setSelectStatus(status);
        openModal({
          children: <DefaultChangeStatusModal status={status} />,
          onCancel: () => {
            closeModal();
          },
          onSubmit: () => {
            changeStatusMutate();
          },
        });
    }
  };

  return (
    <Stack justify="space-between" align="center" margin="16px 0 24px 0">
      <Stack align="center" gap={8}>
        <Dropdown
          placeholder="상태"
          width={95}
          value={applicationFilter.status}
          options={["전체"].concat(Object.values(applicationStatus))}
          changeHandler={item => {
            setDropdownApplicationFilter("status", item === "전체" ? "" : item);
          }}
        />
        <Dropdown
          placeholder="모집년도"
          width={95}
          value={applicationFilter.year}
          options={Array.from({ length: 11 }, (_, i) => iYear - i)}
          changeHandler={item => {
            setDropdownApplicationFilter("year", item);
          }}
        />
        <Input
          width={280}
          placeholder="기업명 or 이름을 검색하세요."
          isSearch={true}
          value={applicationFilter.companyOrStudentName}
          name="companyOrStudentName"
          onChange={setInputApplicationFilter}
        />
      </Stack>
      <Stack justify="flex-end" gap={8}>
        <BigButton
          width={120}
          disabled={
            !applicationFilter.status &&
            applicationFilter.year === iYear &&
            !applicationFilter.companyOrStudentName
          }
          icon={<Rollback stroke={themes.Color.primary[20]} />}
          onClick={() => {
            resetApplicationFilter();
            toast.success("필터 초기화에 성공하였습니다.");
          }}
        >
          <Text fontSize="body3" fontWeight="regular">
            필터 초기화
          </Text>
        </BigButton>
        <Dropdown
          disabled={
            selectApplication.length === 0 ||
            fieldTrainApplicationIsPending ||
            rejectApplicationIsPending ||
            changeStatusIsPening
          }
          placeholder="상태변경"
          width={95}
          value={""}
          options={Object.values(applicationStatus)}
          changeHandler={item => {
            statusHandler(item as ApplicationKRStatusType);
          }}
          isChangeBtn={true}
        />
      </Stack>
    </Stack>
  );
};
