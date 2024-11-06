"use client";

import { Container, Wrapper } from "./style";
import { Text, Icon, Input, Button, Flex, useToast } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCheckBusinessNumber } from "@/hooks/apis/useCheckBusinessNumber";
import { regex } from "@/utils/regex";
import { ICompanyLoginRequest } from "@/apis/auth/types";
import { AxiosError } from "axios";
import { useState } from "react";
import { useCompanyLogin } from "@/hooks/apis/useCompanyLoginApi";

export default function Home() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<ICompanyLoginRequest>();
  const { toast } = useToast();
  const [isVerified, setIsVerified] = useState(false);

  const {
    mutateAsync: checkBusinessNumber,
    isLoading: checkBusinessNumberLoading,
  } = useCheckBusinessNumber(watch("business_number"));
  const { mutate: companyLogin, isLoading: companyLoginLoading } =
    useCompanyLogin();

  const onSubmit: SubmitHandler<ICompanyLoginRequest> = data => {
    companyLogin({
      ...data,
      business_number: data.business_number.replaceAll("-", ""),
    });
  };

  const verify = async () => {
    const pattern = /^\d{3}-\d{2}-\d{5}$/;
    if (watch("business_number")?.length <= 0) {
      setError("business_number", { message: "필수 입력 항목입니다." });
      return;
    } else if (
      !pattern.test(watch("business_number")) ||
      watch("business_number").length !== 12
    ) {
      setError("business_number", {
        message: "유효한 사업자번호 형식이 아닙니다.",
      });
      return;
    }
    const response = await checkBusinessNumber().catch(
      (err: AxiosError<AxiosError>) => {
        if (err.response?.data.message === "Company Not Exists") {
          toast({
            payload: {
              message: "존재하지 않는 기업입니다.",
              type: "error",
            },
          });
        }
      }
    );

    if (response && response.exists) {
      setIsVerified(true);
      clearErrors();
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Flex
          align="center"
          gap={6}
          style={{
            marginBottom: 28,
          }}
        >
          <Text
            fontSize="h5"
            fontWeight="bold"
            color={themes.Color.primary[20]}
          >
            사업자 인증
          </Text>
          <Icon icon="Info" color={themes.Color.grayScale[50]} size={24} />
        </Flex>
        <Flex
          direction="column"
          gap={36}
          style={{
            width: "100%",
          }}
        >
          <Flex justify="space-between" align="end" gap={8}>
            <Controller
              control={control}
              name="business_number"
              rules={{
                required: "필수 입력 항목입니다.",
                pattern: {
                  value: /^\d{3}-\d{2}-\d{5}$/,
                  message: "유효한 사업자번호 형식이 아닙니다.",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="사업자번호"
                  placeholder="사업자 번호를 입력해주세요"
                  maxLength={12}
                  width={250}
                  autoComplete="off"
                  disabled={isVerified}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(regex.buisness_number(e.target.value))
                  }
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      verify();
                    }
                  }}
                  errorMessage={errors.business_number?.message}
                />
              )}
            />
            <Button
              type="button"
              variant="outline"
              onClick={verify}
              disabled={isVerified}
              isLoading={checkBusinessNumberLoading}
              style={{
                padding: "14px 24px",
                marginBottom: errors.business_number ? 22 : 4,
              }}
            >
              인증
            </Button>
          </Flex>
          <Button
            type="submit"
            disabled={!isVerified}
            isLoading={companyLoginLoading}
          >
            확인
          </Button>
        </Flex>
      </Wrapper>
    </Container>
  );
}
