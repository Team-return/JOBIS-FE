"use client";

import React from "react";
import * as S from "./style";
import { Text, Button } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";

const LogoutModal = () => {
  const { closeModal } = useModal();
  return (
    <S.Container>
      <S.TextWrapper>
        <Text fontSize="body1" fontWeight="bold">
          로그아웃
        </Text>
        <Text
          fontSize="body2"
          fontWeight="regular"
          color={themes.Color.grayScale[60]}
        >
          로그아웃 시 다음 접속 때 로그인 해야합니다.
        </Text>
      </S.TextWrapper>
      <S.ButtonWrapper>
        <Button
          onClick={closeModal}
          style={{ width: "112px", height: "48px" }}
          variant="outline"
        >
          취소
        </Button>
        <Button style={{ width: "112px", height: "48px" }}>확인</Button>
      </S.ButtonWrapper>
    </S.Container>
  );
};

export default LogoutModal;
