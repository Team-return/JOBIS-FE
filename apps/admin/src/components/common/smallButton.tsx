import { themes } from "@jobis/design-token";
import {
  forwardRef,
  type ForwardedRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { css, styled, type CSSProperties } from "styled-components";

type PropsType = {
  variant?: "gray" | "primary";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SmallButton = forwardRef(
  (
    {
      variant = "primary",
      children,
      icon,
      width,
      height = 26,
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
  $variant: "gray" | "primary";
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

  border: none;
  border-radius: 40px;

  font-size: ${themes.Font.caption};
  font-weight: ${themes.FontWeight.medium};
  cursor: pointer;
  ${({ $variant }) =>
    $variant === "gray"
      ? css`
          background-color: ${themes.Color.grayScale[20]};

          color: ${themes.Color.grayScale[60]};
        `
      : css`
          background-color: ${themes.Color.primary[10]};

          color: ${themes.Color.primary[20]};
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
