import { SmallButton, Stack } from "@/components";
import { styled } from "styled-components";
import { Text } from "@jobis/ui";
import { AttachmentUrlType, useDownloadData } from "@/apis";
import { themes } from "@jobis/design-token";
import { convertFileName } from "@/utils";

type PropsType = {
  attachment: AttachmentUrlType;
  idx: number;
};

export const ApplicantFileRow = ({ attachment, idx }: PropsType) => {
  const { mutate: downloadMutate } = useDownloadData();

  const downloadOrOpenLink = (attachmentItem: AttachmentUrlType) => {
    attachmentItem.type === "FILE"
      ? downloadMutate(attachmentItem.url)
      : window.open(attachmentItem.url, "_blank", "noopener, noreferrer");
  };

  const attachmentName = (url: string) => {
    return url.split("/").at(-1)!;
  };

  return (
    <Stack width="100%" justify="center" align="center">
      <StyleText
        $width="10%"
        fontSize="body3"
        fontWeight="medium"
        color={themes.Color.grayScale[60]}
      >
        {idx + 1}
      </StyleText>
      <ContentText
        $width="60%"
        fontSize="body3"
        fontWeight="medium"
        color={themes.Color.grayScale[60]}
        title={convertFileName(attachment)}
      >
        {convertFileName(attachment)}
      </ContentText>
      <Stack width="29%" margin="0 0 0 2%" gap={5} justify="end">
        {attachmentName(attachment.url)?.slice(-3) === "pdf" && (
          <SmallButton
            height={26}
            onClick={() => {
              window.open(`/file?url=${encodeURI(attachment.url)}`);
            }}
          >
            <Text fontSize="caption" fontWeight="medium">
              미리보기
            </Text>
          </SmallButton>
        )}
        <SmallButton
          height={26}
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
  );
};

const StyleText = styled(Text)<{ $width: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};
  height: 36px;

  word-break: keep-all;
`;

const ContentText = styled(Text)<{ $width: string }>`
  width: ${({ $width }) => $width};

  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
`;
