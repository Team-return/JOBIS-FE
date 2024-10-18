"use client";
import * as S from "./style";
import { Text } from "@jobis/ui";
import ErrorIcon from "../../../public/error.svg";

export default function ServerCheck() {
  return (
    <S.Container>
      <S.TitleWrap>
        <img src={ErrorIcon.src} alt="에러아이콘" />
        <Text fontSize="h5" fontWeight="bold">
          서버 점검 안내
        </Text>
      </S.TitleWrap>
      <Text
        fontSize="body2"
        fontWeight="medium"
        style={{ textAlign: "center" }}
      >
        서버 점검으로 인해 일시적으로 사용이 불가능하오니 많은 양해
        부탁드립니다.
        <br />
        서비스 이용에 불편을 드려 죄송합니다.
      </Text>
      <div />
    </S.Container>
  );
}
