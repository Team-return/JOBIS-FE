import { themes } from "@jobis/design-token";
import {
  forwardRef,
  type ForwardedRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { css, styled, type CSSProperties } from "styled-components";

type PropsType = {
  variant?: "solid" | "primary";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
  (
    {
      variant = "solid",
      children,
      icon,
      width,
      height = 36,
      ...props
    }: PropsType,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <StyleButton
        ref={ref}
        $width={width}
        $height={height}
        $variant={variant}
        {...props}
      >
        {icon}
        {children}
      </StyleButton>
    );
  }
);

const StyleButton = styled.button<{
  $width: CSSProperties["width"];
  $height: CSSProperties["height"];
  $variant: "solid" | "primary";
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width}px;
    `}
  height: ${({ $height }) => $height}px;
  padding: 0 9px;
  gap: 8px;
  ${({ $variant }) =>
    $variant === "solid"
      ? css`
          border: 1px solid ${themes.Color.primary[20]};

          background-color: ${themes.Color.grayScale[30]};

          color: ${themes.Color.primary[20]};
        `
      : css`
          border: none;

          background-color: ${themes.Color.primary[20]};

          color: ${themes.Color.grayScale[10]};
        `}
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
