import { Wrapper } from "./style";
import { Text } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { ITitleTemplate } from "./types";

export const TitleTemplate = ({ title, subTitle }: ITitleTemplate) => {
  return (
    <Wrapper>
      <Text fontSize="h2" fontWeight="bold">
        {title}
      </Text>
      <Text
        fontSize="body2"
        color={themes.Color.grayScale[60]}
        align="center"
        whiteSpace="pre-wrap"
      >
        {subTitle}
      </Text>
    </Wrapper>
  );
};
