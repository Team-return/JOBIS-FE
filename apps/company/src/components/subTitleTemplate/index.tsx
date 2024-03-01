import { Wrapper } from "./style";
import { Text, Flex } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { ISubTitleTemplate } from "./types";

export const SubTitleTemplate = ({
  components,
  title,
  requiredMessage = false,
}: ISubTitleTemplate) => {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 48,
        }}
      >
        <Text fontSize="h5" fontWeight="bold">
          {title}
        </Text>
        {requiredMessage && (
          <Text
            fontSize="body3"
            fontWeight="regular"
            color={themes.Color.primary[20]}
          >
            * 표시는 필수 입력 항목입니다.
          </Text>
        )}
      </div>
      <Flex direction="column" gap={24}>
        {components?.map(component => {
          return component;
        })}
      </Flex>
    </Wrapper>
  );
};
