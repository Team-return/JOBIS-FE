"use client";

import { Container, Wrapper } from "./style";
import { Text, Icon, Input, Button, Flex } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useCheckBusinessNumber } from "@/hooks/apis/useCheckBusinessNumber";

export default function Home() {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<{
    business_number: string;
  }>();

  const { mutate } = useCheckBusinessNumber(watch("business_number"));

  const onSubmit: SubmitHandler<{
    business_number: string;
  }> = () => {
    mutate();
  };

  return (
    <Container>
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
          as="form"
          direction="column"
          gap={36}
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
          }}
        >
          <Controller
            control={control}
            name="business_number"
            rules={{
              required: "필수 입력 항목입니다.",
              pattern: {
                value: /^\d{3}-\d{2}-\d{5}$/,
                message: "유효한 사업자번호 형식이 아닙니다. (ex: xxx-xx-xxxx)",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="사업자 번호를 입력해주세요"
                maxLength={12}
                autoComplete="off"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.value)
                }
                errorMessage={errors.business_number?.message}
              />
            )}
          />
          <Button type="submit">확인</Button>
        </Flex>
      </Wrapper>
    </Container>
  );
}
