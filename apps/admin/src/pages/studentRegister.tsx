import { styled } from "styled-components";
import { Text, Divider, Input, Button } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { Stack } from "@/components";
import { useNavigate, useParams } from "react-router-dom";
import { useApproveStudents } from "@/apis";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export const StudentRegister = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const [studentGcns, setStudentGcns] = useState<number[]>([-1]);
  const { mutate, isPending } = useApproveStudents(
    Number.parseInt(id!),
    studentGcns.filter(e => e !== -1),
    {
      onSuccess: () => navigate("/"),
    }
  );

  if (!id || !/^\d+$/.test(id)) {
    navigate(-1);
    toast.error("적절하지 않은 경로에요.");
    return null;
  }

  const focusIndex = (index: number) =>
    inputContainerRef.current?.querySelectorAll("input")[index]?.focus();

  const deleteIndex = (index: number) => {
    if (index === 0) {
      return;
    }
    if (studentGcns[index] >= 10) {
      return;
    }

    const newValue = [...studentGcns];
    newValue.splice(index, 1);

    setStudentGcns(newValue);
    requestAnimationFrame(() => focusIndex(index - 1));
  };

  const handleChange = (index: number, value: string) => {
    if (value.startsWith("e") || value.startsWith("-")) {
      return;
    }
    if (value === "") {
      value = "-1";
    }

    const parsedInput = Number(value);
    if (Number.isNaN(parsedInput) || parsedInput > 9999) {
      return;
    }

    const newValue = [...studentGcns];
    const prev = newValue[index];
    newValue[index] = parsedInput;

    if (index !== 0 && parsedInput === -1) {
      deleteIndex(index);
      return;
    } else if (index === studentGcns.length - 1 && parsedInput > prev) {
      newValue.push(-1);
    }

    setStudentGcns(newValue);
  };

  const registerStudents = () => {
    if (studentGcns.filter(e => e !== -1).length === 0) {
      navigate("/");
      return;
    }
    mutate();
  };

  return (
    <Container>
      <Stack width="54%" direction="column" align="center">
        <Stack direction="column" align="center" gap={12}>
          <Text fontSize="h2" fontWeight="bold">
            학생정보 등록
          </Text>
          <SubTitle
            fontSize="body2"
            fontWeight="regular"
            align="center"
            color={themes.Color.grayScale[60]}
          >
            등록된 정보는 본 시스템을 통해 접수된 건에 한하여
          </SubTitle>
        </Stack>
        <Stack direction="column" align="center" gap={80}>
          <SubTitle
            fontSize="body2"
            fontWeight="regular"
            color={themes.Color.grayScale[60]}
          >
            정식적으로 검토되며, 등록된 정보는 서비스 이용에 활용됩니다.
          </SubTitle>
          <Stack justify="space-between">
            <Text fontSize="h5" fontWeight="bold">
              학생정보
            </Text>
            <StyleText
              fontSize="body3"
              fontWeight="regular"
              color={themes.Color.subColor.blue[30]}
            >
              <RequireIcon $left={-18} $top={5} />
              표시는 필수 입력 항목입니다.
            </StyleText>
          </Stack>
        </Stack>
        <Separator />
        <Stack direction="column" align="center" gap={120}>
          <Stack direction="column" ref={inputContainerRef}>
            {studentGcns.map((value, index) => (
              <InputScope key={index}>
                <LabelText fontSize="body2" fontWeight="regular">
                  학번
                  {index === 0 && <RequireIcon $left={3} $top={0} />}
                </LabelText>
                <StyleInput
                  value={value === -1 ? "" : value}
                  onChange={e => handleChange(index, e.target.value)}
                  maxLength={4}
                  onKeyDown={e => {
                    e.key === "Backspace" && deleteIndex(index);
                    e.key === "Enter" && focusIndex(index + 1);
                  }}
                  placeholder={index === 0 ? "직접입력" : "추가입력"}
                />
              </InputScope>
            ))}
          </Stack>
          <Stack gap={8} justify="space-between" align="center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              style={{
                height: "48px",
                backgroundColor: themes.Color.grayScale[10],
              }}
            >
              <Text
                fontSize="body2"
                fontWeight="regular"
                color={themes.Color.subColor.blue[30]}
              >
                취소
              </Text>
            </Button>
            <Stack gap={12} justify="center">
              <Circle $color={themes.Color.grayScale[50]} />
              <Circle $color={themes.Color.subColor.blue[30]} />
            </Stack>
            <Button
              disabled={studentGcns.length === 0}
              onClick={registerStudents}
              isLoading={isPending}
              style={{
                height: "48px",
                backgroundColor: themes.Color.subColor.blue[30],
              }}
            >
              <Text
                fontSize="body2"
                fontWeight="regular"
                color={themes.Color.grayScale[10]}
              >
                완료
              </Text>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-width: 1028px;
  margin-top: 56px;
  padding: 80px 100px;
`;

const Circle = styled.div<{
  $color: string;
}>`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  background-color: ${({ $color }) => $color};
`;

const SubTitle = styled(Text)`
  width: 100%;
  max-width: 392px;
`;

const StyleText = styled(Text)`
  margin-top: 12px;
  margin-right: 19px;
`;

const LabelText = styled(Text)`
  width: 104px;
`;

const RequireIcon = styled.span<{
  $right?: number;
  $left?: number;
  $top: number;
}>`
  position: relative;

  line-height: 10px;

  &::before {
    position: absolute;
    top: ${({ $top }) => $top}px;
    right: ${({ $right }) => $right ?? 0}px;
    left: ${({ $left }) => $left ?? 0}px;
    width: 10px;

    color: ${themes.Color.subColor.blue[30]};
    text-align: center;
    content: "*";
  }
`;

const InputScope = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  direction: row;
`;

const StyleInput = styled(Input)`
  width: 100%;
  padding: 12px;
  border: none;

  background-color: ${themes.Color.grayScale[20]};
  outline: none;

  &::placeholder {
    color: ${themes.Color.grayScale[50]};
    font-size: ${themes.Font.body2};
    font-weight: ${themes.FontWeight.regular};
  }
`;

const Separator = styled(Divider)`
  margin-top: 4px;
  margin-bottom: 20px;
`;
