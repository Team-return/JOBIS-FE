import { LoadingIcon } from "@assets/images";
import { type HTMLAttributes } from "react";
import { styled } from "styled-components";

type PropsType = {
  label?: string;
  width?: string;
} & HTMLAttributes<HTMLDivElement>;

export const Loading = ({ width = "100%", ...props }: PropsType) => {
  return (
    <Container $width={width} {...props}>
      <LoadingIcon width={28} height={28} />
    </Container>
  );
};

const Container = styled.div<{ $width: string }>`
  width: 28px;
  height: 28px;
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
