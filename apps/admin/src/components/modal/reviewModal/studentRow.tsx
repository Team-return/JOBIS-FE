import { Stack } from "@/components";
import { styled } from "styled-components";
import { Radio, Text } from "@jobis/ui";
import type { ReviewsType } from "@/apis";
import { themes } from "@jobis/design-token";
import type { Dispatch, SetStateAction } from "react";
import { useQueryClient } from "@tanstack/react-query";

type PropsType = {
  item: ReviewsType;
  setSelectId: Dispatch<SetStateAction<string>>;
  selectId: string;
};

export const ReviewStudentRow = ({
  item,
  setSelectId,
  selectId,
}: PropsType) => {
  const queryClient = useQueryClient();

  return (
    <Stack
      width="100%"
      justify="center"
      align="center"
      onClick={() => {
        setSelectId(item.review_id);
        selectId !== item.review_id &&
          queryClient.invalidateQueries({ queryKey: ["getReviewDetail"] });
      }}
    >
      <Radio
        checked={selectId === item.review_id}
        onChange={() => {
          setSelectId(item.review_id);
        }}
      />
      <StyleText
        $width="30%"
        fontSize="body3"
        fontWeight="medium"
        color={themes.Color.grayScale[60]}
      >
        {item.year}
      </StyleText>
      <StyleText
        $width="30%"
        fontSize="body3"
        fontWeight="medium"
        color={themes.Color.grayScale[60]}
      >
        {item.writer}
      </StyleText>
      <StyleText
        $width="30%"
        fontSize="body3"
        fontWeight="medium"
        color={themes.Color.grayScale[60]}
      >
        {`${item.year}-${item.date}`}
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
