import { LoadIcon } from "@assets/images";
import type { HTMLAttributes } from "react";
import { styled } from "styled-components";

type PropsType = {
  label?: string;
  size?: number;
} & HTMLAttributes<HTMLDivElement>;

export const Loading = ({ size = 28, ...props }: PropsType) => {
  return (
    <Container $size={size} {...props}>
      <img src={LoadIcon} width={size} height={size} />
    </Container>
  );
};

const Container = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;

  animation: load 1.5s ease-in-out infinite;

  @keyframes load {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
