import { useRejectedMessage, useSelectApplication } from "@/stores";
import { themes } from "@jobis/design-token";
import { Text } from "@jobis/ui";
import { Stack, Textarea } from "@/components";

export const RejectedStatusModal = () => {
  const { selectApplication } = useSelectApplication();
  const { rejectedMessage, setRejectedMessage } = useRejectedMessage();

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
    <Stack direction="column" width={420} gap={8}>
      <Text fontSize="h5" fontWeight="bold">
        상태변경
      </Text>
      <Text
        fontSize="body1"
        fontWeight="regular"
        color={themes.Color.grayScale[60]}
      >
        {`${selectStudent()}의 지원서를 반려로 변경하시겠습니까?`}
      </Text>
      <Textarea value={rejectedMessage} onChange={setRejectedMessage} />
    </Stack>
  );
};
