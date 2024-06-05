import { useModal } from "@/stores";
import { themes } from "@jobis/design-token";
import { Radio, Text } from "@jobis/ui";
import { BigButton, SmallButton, Stack } from "@/components";
import { styled } from "styled-components";
import { ApplicantFileCellData, ApplicantStudentCellData } from "@/constants";
import {
  useChangeApplicationStatus,
  useDownloadData,
  useGetAllApplication,
  type AttachmentUrlType,
} from "@/apis";
import { useState } from "react";
import { convertFileName } from "@/utils";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { FileDownArrow } from "@/assets/images";

type PropsType = {
  status: "REQUESTED" | "APPROVED";
  id: number;
  isRequest: boolean;
};

export const ApplicantModal = ({ isRequest, status, id }: PropsType) => {
  const { closeModal } = useModal();
  const [selectId, setSelectId] = useState<number>(0);

  const queryClient = useQueryClient();

  const { data, refetch } = useGetAllApplication(status, id);
  const { mutate: changeStatusMutate } = useChangeApplicationStatus(
    "APPROVED",
    [selectId],
    {
      onSuccess: () => {
        refetch();
        toast.success("승인 상태로 변경되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["getAllRecruitmentForm"] });
        queryClient.invalidateQueries({ queryKey: ["getAllApplication"] });
      },
    }
  );
  const { mutate: downloadMutate } = useDownloadData();

  const selectStudent = data?.applications.find(
    item => item.application_id === selectId
  );

  const downloadOrOpenLink = (attachment: AttachmentUrlType) => {
    attachment.type === "FILE"
      ? downloadMutate(attachment.url)
      : window.open(attachment.url, "_blank", "noopener, noreferrer");
  };

  return (
    <Stack
      position="relative"
      direction="column"
      width={382}
      gap={8}
      style={{ padding: "8px" }}
    >
      <Stack justify="space-between" align="center">
        <Text fontSize="h5" fontWeight="bold">
          {isRequest ? "지원요청" : "지원자"}
        </Text>
        {isRequest && (
          <ApproveBtn
            disabled={!selectId}
            onClick={() => {
              !!selectId && changeStatusMutate();
            }}
          >
            승인
          </ApproveBtn>
        )}
      </Stack>
      <TitleWrapper>
        {ApplicantStudentCellData.map((item, idx) => (
          <Stack key={idx} width={item.width} justify="center" align="center">
            <Text
              fontSize="body3"
              fontWeight="medium"
              color={themes.Color.grayScale[60]}
            >
              {item.title}
            </Text>
          </Stack>
        ))}
      </TitleWrapper>
      <Stack direction="column" gap={10}>
        {data?.applications.map((item, idx) => (
          <Stack
            key={idx}
            width="100%"
            justify="center"
            align="center"
            onClick={() => {
              setSelectId(item.application_id);
            }}
          >
            <Radio
              checked={selectId === item.application_id}
              onChange={() => {
                setSelectId(item.application_id);
              }}
            />
            <StyleText
              $width="30%"
              fontSize="body3"
              fontWeight="medium"
              color={themes.Color.grayScale[60]}
            >
              {item.student_gcn}
            </StyleText>
            <StyleText
              $width="30%"
              fontSize="body3"
              fontWeight="medium"
              color={themes.Color.grayScale[60]}
            >
              {item.student_name}
            </StyleText>
            <StyleText
              $width="30%"
              fontSize="body3"
              fontWeight="medium"
              color={themes.Color.grayScale[60]}
            >
              {item.created_at}
            </StyleText>
          </Stack>
        ))}
      </Stack>
      <TitleWrapper style={{ margin: "34px 0 0 0" }}>
        {ApplicantFileCellData.map((item, idx) => (
          <Stack key={idx} width={item.width} justify="center" align="center">
            <Text
              fontSize="body3"
              fontWeight="medium"
              color={themes.Color.grayScale[60]}
            >
              {item.title}
            </Text>
          </Stack>
        ))}
      </TitleWrapper>
      <Stack direction="column" gap={10}>
        {selectStudent ? (
          selectStudent.attachments.map((attachment, idx) => (
            <Stack key={idx} width="100%" justify="center" align="center">
              <StyleText
                $width="20%"
                fontSize="body3"
                fontWeight="medium"
                color={themes.Color.grayScale[60]}
              >
                {idx + 1}
              </StyleText>
              <StyleText
                $width="60%"
                fontSize="body3"
                fontWeight="medium"
                style={{ justifyContent: "start" }}
                color={themes.Color.grayScale[60]}
              >
                {convertFileName(attachment)}
              </StyleText>
              <Stack width="20%">
                <SmallButton
                  height={26}
                  icon={<img src={FileDownArrow} />}
                  onClick={() => {
                    downloadOrOpenLink(attachment);
                  }}
                >
                  <Text fontSize="caption" fontWeight="medium">
                    {attachment.type === "FILE" ? "다운" : "링크"}
                  </Text>
                </SmallButton>
              </Stack>
            </Stack>
          ))
        ) : (
          <Stack
            width="100%"
            justify="center"
            align="center"
            style={{ height: 100 }}
          >
            <Text
              fontSize="body3"
              fontWeight="medium"
              color={themes.Color.grayScale[60]}
            >
              학생을 선택해주세요.
            </Text>
          </Stack>
        )}
      </Stack>
      <CancleBtn variant="primary" width={122} height={48} onClick={closeModal}>
        <Text fontSize="body2" fontWeight="bold">
          닫기
        </Text>
      </CancleBtn>
    </Stack>
  );
};

const ApproveBtn = styled.button`
  width: 64px;
  height: 28px;
  border: 1px solid ${themes.Color.primary[20]};
  border-radius: 48px;

  background-color: ${themes.Color.grayScale[10]};

  color: ${themes.Color.primary[20]};
  font-size: ${themes.Font.body3};
  font-weight: ${themes.FontWeight.regular};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancleBtn = styled(BigButton)`
  position: absolute;
  right: -24px;
  bottom: -100px;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  border-bottom: 1px solid ${themes.Color.grayScale[40]};

  color: ${themes.Color.grayScale[60]};
  font-size: ${themes.Font.body2};
  font-weight: ${themes.FontWeight.medium};
`;

const StyleText = styled(Text)<{ $width: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};
  height: 36px;

  word-break: keep-all;

  text-align: center;
`;
