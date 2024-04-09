import Image from "next/image";
import { styled } from "styled-components";
import { LoadingProps, PositionType } from "./types";

export const Wrapper = styled.div<{ pos?: PositionType }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ pos }) => pos};
  align-items: ${({ pos }) => pos};
  width: 100%;
  height: 100%;
`;

export const Img = styled(Image)<LoadingProps>`
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
