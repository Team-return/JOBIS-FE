import { css, styled } from "styled-components";
import { Text } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { ApplicationCellData } from "@/constants";
import { Checkbox, SmallButton, Stack } from "@/components";
import {
  useDownloadData,
  type ApplicationType,
  type AttachmentUrlType,
} from "@/apis";
import { useSelectApplication } from "@/stores";
import { applicationStatus, applicationStatusTextColor } from "@/@types/enums";
import { ChevronIcon, FileIcon, UrlIcon } from "@/assets/images";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { convertFileName } from "@/utils";

type PropsType = {
  data: ApplicationType;
};

export const ApplicationRow = ({ data }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate } = useDownloadData();

  const { selectApplication, addSelectApplication, deleteSelectApplication } =
    useSelectApplication();

  const isSelect = selectApplication
    .map(item => item.id)
    .includes(data.application_id);

  const clickHandler = () => {
    isSelect
      ? deleteSelectApplication({
          id: data.application_id,
          name: data.student_name,
        })
      : addSelectApplication({
          id: data.application_id,
          name: data.student_name,
        });
  };

  const firstFileAttachment = data.attachments.find(
    attachment => attachment.type === "FILE"
  );

  const downloadOrOpenLink = (attachment: AttachmentUrlType) => {
    attachment.type === "FILE"
      ? mutate(attachment.url)
      : window.open(attachment.url, "_blank", "noopener, noreferrer");
  };

  const attachmentName = (attachment: string) => {
    return attachment.split("/").at(-1)!;
  };

  const renderAttachments = () => (
    <AttachmentBox>
      {data.attachments.map((attachment, idx) => (
        <AttachmentItem key={idx}>
          <img src={attachment.type === "FILE" ? FileIcon : UrlIcon} alt="" />
          <Stack
            title={convertFileName(attachment).slice(
              0,
              attachmentName(attachment.url).length - 37
            )}
          >
            <AttachmentText
              fontSize="body2"
              fontWeight="medium"
              style={{
                maxWidth: attachment.type === "FILE" ? "100px" : "130px",
              }}
            >
              {convertFileName(attachment).slice(
                0,
                attachmentName(attachment.url).length - 40
              )}
            </AttachmentText>
            {attachment.type === "FILE" && (
              <Text fontSize="body2" fontWeight="medium">
                {attachmentName(attachment.url).slice(-3)}
              </Text>
            )}
          </Stack>
          {attachmentName(attachment.url).slice(-3) === "pdf" && (
            <SmallButton
              onClick={() => {
                window.open(`/file?url=${encodeURI(attachment.url)}`);
              }}
            >
              미리보기
            </SmallButton>
          )}
          <SmallButton onClick={() => downloadOrOpenLink(attachment)}>
            {attachment.type === "FILE" ? "다운로드" : "링크이동"}
          </SmallButton>
        </AttachmentItem>
      ))}
    </AttachmentBox>
  );

  return (
    <Container position="relative" align="center" onClick={clickHandler}>
      <CheckboxWrapper className="checkbox">
        <Checkbox checked={isSelect} onChange={() => {}} />
      </CheckboxWrapper>
      <StyleText
        $width={ApplicationCellData[0].width}
        fontSize="body2"
        fontWeight="medium"
        $color={applicationStatusTextColor[data.application_status]}
      >
        {applicationStatus[data.application_status]}
      </StyleText>
      <StyleText
        $width={ApplicationCellData[1].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.student_gcn}
      </StyleText>
      <StyleText
        $width={ApplicationCellData[2].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.student_name}
      </StyleText>
      <StyleText
        $width={ApplicationCellData[3].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.company_name}
      </StyleText>
      <StyleText
        $width={ApplicationCellData[4].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.created_at}
      </StyleText>
      <AttachmentWrapper $width={ApplicationCellData[5].width}>
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsOpen(false);
          }}
        >
          <Stack
            width="100%"
            align="center"
            gap={12}
            onClick={e => {
              e.stopPropagation();
              setIsOpen(prev => !prev);
            }}
          >
            <StyleText
              as="div"
              fontSize="body2"
              fontWeight="medium"
              $isClick={true}
              style={{ position: "relative", justifyContent: "flex-end" }}
            >
              {`${firstFileAttachment ? convertFileName(firstFileAttachment) : data.attachments[0].url} ${data.attachments.length === 1 ? "" : `외 ${data.attachments.length - 1}개`}`}
              {isOpen && renderAttachments()}
            </StyleText>
            <ChevronImg
              width={20}
              height={20}
              $isopen={isOpen}
              stroke={themes.Color.grayScale[60]}
            />
          </Stack>
        </OutsideClickHandler>
      </AttachmentWrapper>
    </Container>
  );
};

const Container = styled(Stack)`
  cursor: pointer;
  border-bottom: 1px solid ${themes.Color.grayScale[40]};

  &:hover {
    background-color: ${themes.Color.grayScale[40]};

    .checkbox {
      background-color: ${themes.Color.grayScale[40]};

      :first-child {
        border-color: ${themes.Color.grayScale[10]};

        :checked {
          border: none;
        }
      }
    }
  }
`;

const ChevronImg = styled(ChevronIcon)<{ $isopen: boolean }>`
  rotate: ${({ $isopen }) => ($isopen ? "180deg" : "0deg")};

  transition-duration: 0.5s;
`;

const CheckboxWrapper = styled.div`
  position: absolute;
  left: -40px;
  display: flex;
  align-items: center;
  width: 40px;
  height: calc(100% + 2px);
  border-bottom: 1px solid ${themes.Color.grayScale[40]};
  border-top: 1px solid ${themes.Color.grayScale[40]};
  cursor: pointer;
`;

const AttachmentWrapper = styled.div<{ $width: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};
  height: 80px;
`;

const AttachmentBox = styled.div`
  position: absolute;
  top: 60px;
  left: 8px;
  z-index: 1;
  padding: 12px 16px;
  border-radius: 4px;

  background-color: ${themes.Color.grayScale[10]};
  box-shadow: 0 4px 20px 0 rgb(112 144 176 / 12%);
`;

const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 8px;
  gap: 8px;
`;

const AttachmentText = styled(Text)`
  overflow: hidden;

  text-align: start;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyleText = styled(Text)<{
  $width?: string;
  $isClick?: boolean;
  $color?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $width }) => css`
    width: ${$width};
  `};
  height: 80px;
  padding: 0 8px;

  word-break: keep-all;

  text-align: center;
  ${({ $isClick }) =>
    $isClick &&
    css`
      text-decoration: underline;
      text-underline-offset: 2px;
    `}
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
`;
