"use client";

import React, { useEffect, useState } from "react";
import { Text } from "@jobis/ui";
import LoadingImg from "../../../public/Loading.png";
import * as S from "./style";
import { LoadingProps } from "./types";

export const Spinner = ({ size = 180, position, isMessage }: LoadingProps) => {
  const [message, setMessage] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setMessage(pre => (pre >= 3 ? (pre = 0) : pre + 1));
    }, 300);
  }, [message]);

  return (
    <S.Wrapper pos={position ?? "center"}>
      <S.Img size={size} src={LoadingImg} alt="" />
      {isMessage && (
        <Text
          style={{ margin: "28px 0" }}
          fontSize="body1"
        >{`Loading${".".repeat(message)}`}</Text>
      )}
    </S.Wrapper>
  );
};
