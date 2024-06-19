import { Stack } from "@/components";
import { styled } from "styled-components";
import { Text } from "@jobis/ui";
import type { ReviewDetailType } from "@/apis";
import { themes } from "@jobis/design-token";

type PropsType = {
  item: ReviewDetailType;
};

export const ReviewBox = ({ item }: PropsType) => {
  return (
    <Container>
      <Stack width="100%" justify="space-between" align="center" gap={4}>
        <Text
          fontSize="body3"
          fontWeight="medium"
          color={themes.Color.grayScale[70]}
        >
          {item.question}
        </Text>
        <Tag>{item.area}</Tag>
      </Stack>
      <Text
        fontSize="body3"
        fontWeight="regular"
        color={themes.Color.grayScale[60]}
      >
        {item.answer}
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 12px;

  background-color: ${themes.Color.grayScale[20]};
  gap: 8px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 56px;

  background-color: ${themes.Color.primary[10]};

  color: ${themes.Color.subColor.blue[20]};
  ${themes.Font.caption};
  font-weight: ${themes.FontWeight.regular};
`;
