import { Stack } from "@/components";
import { styled } from "styled-components";
import { Radio, Text } from "@jobis/ui";
import type { ApplicationType } from "@/apis";
import { themes } from "@jobis/design-token";
import type { Dispatch, SetStateAction } from "react";

type PropsType = {
  item: ApplicationType;
  setSelectId: Dispatch<SetStateAction<number>>;
  selectId: number;
};

export const ApplicantStudentRow = ({
  item,
  setSelectId,
  selectId,
}: PropsType) => {
  return (
    <Stack
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
