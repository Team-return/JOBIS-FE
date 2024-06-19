import { useFieldTrainDate, useSelectApplication } from "@/stores";
import { themes } from "@jobis/design-token";
import { Text } from "@jobis/ui";
import { DateRangePicker, Stack } from "@/components";

export const FieldTrainStatusModal = () => {
  const { selectApplication } = useSelectApplication();
  const { fieldTrainDate, setFieldTrainDate } = useFieldTrainDate();

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
    <Stack direction="column" width={350} gap={8}>
      <Text fontSize="h5" fontWeight="bold">
        상태변경
      </Text>
      <Text
        fontSize="body1"
        fontWeight="regular"
        color={themes.Color.grayScale[60]}
      >
        {`${selectStudent()}의 지원서를 현장실습으로 변경하시겠습니까?`}
      </Text>
      <Stack width={350} gap={152}>
        <Text
          fontSize="body3"
          fontWeight="regular"
          color={themes.Color.grayScale[80]}
        >
          파견일자
        </Text>
        <Text
          fontSize="body3"
          fontWeight="regular"
          color={themes.Color.grayScale[80]}
        >
          종료일자
        </Text>
      </Stack>
      <DateRangePicker
        disabled={false}
        startDate={fieldTrainDate.startDate}
        endDate={fieldTrainDate.endDate}
        changeHandler={setFieldTrainDate}
      />
    </Stack>
  );
};
