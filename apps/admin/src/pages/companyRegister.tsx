import { styled } from "styled-components";
import { Text, Divider, Input, Icon, Button } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { Stack } from "@/components";
import { useForm } from "@/hooks";
import { useNavigate } from "react-router-dom";
import {
  RegisterCompanyRequest,
  usePresignLogoFile,
  useRegisterCompany,
} from "@/apis";
import { toast } from "react-hot-toast";
import { useState } from "react";

export const CompanyRegister = () => {
  const navigate = useNavigate();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { form, handleChange, setForm } = useForm<RegisterCompanyRequest>({
    companyName: "",
    businessNumber: "",
    companyProfileUrl: "",
  });

  const { companyName, businessNumber, companyProfileUrl } = form;

  const { mutate: presignLogoFilemutate, isPending: presignLogoFileIsPending } =
    usePresignLogoFile(
      () => logoFile!,
      () => setLogoFile(null),
      {
        onSuccess: (data: string) => {
          setForm({
            ...form,
            companyProfileUrl: data,
          });
        },
      }
    );

  const { mutate: registerCompanyMutate, isPending: registerCompanyIsPending } =
    useRegisterCompany(companyName, businessNumber, companyProfileUrl, {
      onSuccess: id => navigate(`/student-register/${id}`),
    });

  const presignLogoFile = (file: File | undefined) => {
    if (!file) {
      setLogoFile(null);
      return;
    }

    setLogoFile(file);

    const validNamePattern = /^[a-zA-Z0-9.]+$/;
    const fileName = file.name;

    if (!validNamePattern.test(fileName)) {
      toast.error("파일 이름은 영어와 숫자로만 구성되어야 합니다.");
      setLogoFile(null);
      return;
    }

    presignLogoFilemutate();
  };

  const inputFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/webp, image/jpeg";
    input.click();
    input.addEventListener("change", event => {
      if (!event.target) {
        return;
      }
      const target = event.target as HTMLInputElement;
      const file = target?.files?.[0];
      presignLogoFile(file);
      input.remove();
    });
  };

  const registerCompany = () => {
    registerCompanyMutate();
  };

  const isPending = presignLogoFileIsPending || registerCompanyIsPending;

  return (
    <Container>
      <Stack width="54%" direction="column" align="center">
        <Stack direction="column" gap={12} align="center">
          <Text fontSize="h2" fontWeight="bold">
            기업정보 등록
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
        <Stack direction="column" gap={80} align="center">
          <SubTitle
            fontSize="body2"
            fontWeight="regular"
            color={themes.Color.grayScale[60]}
          >
            정식적으로 검토되며, 등록된 정보는 서비스 이용에 활용됩니다.
          </SubTitle>
          <Stack justify="space-between">
            <Text fontSize="h5" fontWeight="bold">
              기업정보
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
        <Stack direction="column" gap={120}>
          <Stack direction="column" gap={40}>
            <InputScope>
              <LabelText fontSize="body2" fontWeight="regular">
                기업명
                <RequireIcon $left={3} $top={0} />
              </LabelText>
              <StyleInput
                placeholder="직접입력"
                name="companyName"
                value={companyName}
                onChange={handleChange}
              />
            </InputScope>
            <InputScope>
              <LabelText fontSize="body2" fontWeight="regular">
                사업자 번호
                <RequireIcon $left={3} $top={0} />
              </LabelText>
              <StyleInput
                placeholder="직접입력"
                name="businessNumber"
                value={businessNumber}
                onChange={handleChange}
              />
            </InputScope>
          </Stack>
          <Text fontSize="h5" fontWeight="bold">
            회사소개
          </Text>
        </Stack>
        <Separator />
        <Stack direction="column" gap={120}>
          <InputScope>
            <LabelText fontSize="body2" fontWeight="regular">
              회사 로고
              <RequireIcon $left={3} $top={0} />
            </LabelText>
            <FileInput onClick={isPending ? () => {} : inputFile}>
              <Text
                fontSize="body2"
                fontWeight="regular"
                color={themes.Color.primary[20]}
              >
                {presignLogoFileIsPending
                  ? "업로드 중.."
                  : logoFile
                    ? logoFile.name
                    : "파일 추가하기"}
              </Text>
              <Icon icon="Plus" color={themes.Color.primary[20]} />
            </FileInput>
          </InputScope>
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
              <Circle $color={themes.Color.subColor.blue[30]} />
              <Circle $color={themes.Color.grayScale[50]} />
            </Stack>
            <Button
              style={{
                height: "48px",
                backgroundColor: themes.Color.subColor.blue[30],
              }}
              onClick={registerCompany}
              isLoading={isPending}
              disabled={
                companyName.length *
                  businessNumber.length *
                  companyProfileUrl.length ==
                0
              }
            >
              <Text
                fontSize="body2"
                fontWeight="regular"
                color={themes.Color.grayScale[10]}
              >
                다음
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
  margin-bottom: 364px;
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
  direction: row;
  align-items: center;
`;

const StyleInput = styled(Input)`
  width: calc(54vw - 249px);
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

const FileInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(54vw - 200px);
  padding: 12px;
  padding-right: 16px;
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[10]};
  cursor: pointer;
  box-shadow: 0 0 0 1px ${themes.Color.primary[20]} inset;
`;

const Separator = styled(Divider)`
  margin-top: 4px;
  margin-bottom: 20px;
`;
