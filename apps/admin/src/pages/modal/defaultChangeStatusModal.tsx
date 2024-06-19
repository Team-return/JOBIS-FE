import { ApplicationKRStatusType } from "@/@types/types";
import { useSelectApplication } from "@/stores";
import { themes } from "@jobis/design-token";
import { Text } from "@jobis/ui";
import { Stack } from "@/components";

type PropsType = {
  status: ApplicationKRStatusType;
};

export const DefaultChangeStatusModal = ({ status }: PropsType) => {
  const { selectApplication } = useSelectApplication();

  const selectStudent = () => {
    const names = selectApplication
      .slice(0, 3)
      .map(application => application.name)
      .join(", ");
    return selectApplication.length < 4
      ? `${names}`
      : `${names} 외 ${selectApplication.length - 3}명`;
  };

  return (
    <Stack direction="column" width={330} gap={8}>
      <Text fontSize="h5" fontWeight="bold">
        {status === "근로계약" ? "전환" : "상태변경"}
      </Text>
      <Text
        fontSize="body1"
        fontWeight="regular"
        color={themes.Color.grayScale[60]}
      >{`${selectStudent()}의 지원서를 ${status}(으)로 ${status === "근로계약" ? "전환" : "변경"}하시겠습니까?`}</Text>
    </Stack>
  );
};
