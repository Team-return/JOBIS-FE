"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "@jobis/ui";
import LoadingImg from "../../../public/Loading.png";
import Image from "next/image";

type positionType = "center" | "start" | "end";

interface LoadingProps {
  size?: number;
  position?: positionType;
  isMessage?: boolean;
}

export const Spinner = ({ size = 180, position, isMessage }: LoadingProps) => {
  const [message, setMessage] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setMessage(pre => (pre >= 3 ? (pre = 0) : pre + 1));
    }, 300);
  }, [message]);

  return (
    <_Wrapper pos={position ?? "center"}>
      <Img size={size} src={LoadingImg} alt="" unoptimized />
      {isMessage && (
        <Text
          style={{ margin: "28px 0" }}
          fontSize="body1"
        >{`Loading${".".repeat(message)}`}</Text>
      )}
    </_Wrapper>
  );
};

const _Wrapper = styled.div<{ pos?: positionType }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ pos }) => pos};
  align-items: ${({ pos }) => pos};
`;

const Img = styled(Image)<LoadingProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  animation: spin 1.2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
