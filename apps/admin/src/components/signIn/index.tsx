import { useSignIn } from "@apis/users";
import type { SignInRequest } from "@apis/users/types";
import { Checkbox, Loading } from "@components/common";
import { useForm } from "@hooks/useForm";
import { themes } from "@jobis/design-token";
import { Text, Icon, useToast } from "@jobis/ui";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { styled } from "styled-components";

export const SignIn = () => {
  const [cookies] = useCookies();
  const [view, setView] = useState(false);
  const [isSave, setIsSave] = useState(!!cookies.account_id);
  const { form, handleChange } = useForm<SignInRequest>({
    account_id: cookies.account_id || "",
    password: "",
    platform_type: "WEB",
  });

  const { account_id, password } = form;

  const { mutate, isPending } = useSignIn(form, isSave);
  const { toast } = useToast();

  const enterMutate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isPending) {
      mutate();
    }
  };

  return (
    <Container>
      <Text fontSize="h5" fontWeight="bold">
        선생님 로그인
      </Text>
      <InputWrapper>
        <label>
          <Text fontSize="caption">아이디</Text>
          <StyleInput
            name="account_id"
            value={account_id}
            onChange={handleChange}
            onKeyDown={enterMutate}
          />
        </label>
        <label>
          <Text fontSize="caption">비밀번호</Text>
          <IconWrapper>
            <StyleInput
              name="password"
              value={password}
              onChange={handleChange}
              onKeyDown={enterMutate}
              type={view ? "text" : "password"}
            />
            <EyeIcon
              icon={view ? "EyesOpen" : "EyesClose"}
              size={28}
              color={themes.Color.grayScale[60]}
              onClick={(event: React.MouseEvent<HTMLOrSVGElement>) => {
                event.preventDefault();
                setView(prev => !prev);
              }}
            />
          </IconWrapper>
        </label>
      </InputWrapper>
      <Checkbox
        label="아이디 저장"
        checked={isSave}
        onChange={() => {
          setIsSave(prev => !prev);
          toast({
            payload: {
              message: "로그인에 성공하였습니다.",
              type: "success",
            },
          });
        }}
      />
      <StyleBtn
        onClick={() => {
          mutate();
        }}
        disabled={isPending}
      >
        {isPending ? (
          <Loading />
        ) : (
          <Text fontSize="body2" fontWeight="bold">
            확인
          </Text>
        )}
      </StyleBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 440px;
  background-color: ${themes.Color.grayScale[10]};
  border-radius: 8px;
  box-shadow: 0px 4px 20px 0px rgba(112, 144, 176, 0.12);
  padding: 36px;
`;

const InputWrapper = styled.div`
  margin: 26px 0 12px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    cursor: text;
  }
`;

const StyleInput = styled.input`
  width: 328px;
  height: 52px;
  padding: 14px 20px 14px 16px;
  border: 1px solid ${themes.Color.grayScale[50]};
  border-radius: 8px;
  outline: none;
  font-size: ${themes.Font.body2.fontSize};
  font-weight: ${themes.FontWeight.regular};
  &:focus {
    border: 1px solid ${themes.Color.grayScale[90]};
  }
`;

const StyleBtn = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 56px;
  background-color: ${themes.Color.grayScale[90]};
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${themes.Color.grayScale[10]};
  cursor: pointer;
`;

const IconWrapper = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EyeIcon = styled(Icon)`
  position: absolute;
  right: 12px;
  cursor: pointer;
`;
