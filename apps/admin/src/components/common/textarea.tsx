import { themes } from "@jobis/design-token";
import {
  forwardRef,
  type ForwardedRef,
  type InputHTMLAttributes,
  type CSSProperties,
} from "react";
import { styled } from "styled-components";

type PropsType = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
} & InputHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef(
  (
    { width = "100%", height = 116, onChange, ...props }: PropsType,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <StyledTextarea
        ref={ref}
        $width={width}
        $height={height}
        onChange={onChange}
        {...props}
      />
    );
  }
);

const StyledTextarea = styled.textarea<{
  $width?: CSSProperties["width"];
  $height?: CSSProperties["height"];
}>`
  width: ${({ $width }) =>
    typeof $width === "number" ? `${$width}px` : $width};
  height: ${({ $height }) =>
    typeof $height === "number" ? `${$height}px` : $height};
  padding: 16px;
  border: none;
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[20]};
  outline: none;

  font-size: ${themes.Font.body3};
  font-weight: ${themes.FontWeight.regular};

  ::placeholder {
    color: ${themes.Color.grayScale[60]};
  }
`;
