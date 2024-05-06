import { SearchIcon } from "@/assets/images";
import { themes } from "@jobis/design-token";
import {
  forwardRef,
  type ForwardedRef,
  type InputHTMLAttributes,
  type CSSProperties,
} from "react";
import { styled } from "styled-components";

type PropsType = {
  isSearch?: boolean;
  width?: CSSProperties["width"];
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  (
    { isSearch = false, width = "100%", onChange, ...props }: PropsType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <StyledInputWrapper $width={width}>
        {isSearch && <img src={SearchIcon} width={20} />}
        <StyledInput
          ref={ref}
          $isSearch={isSearch}
          onChange={onChange}
          {...props}
        />
      </StyledInputWrapper>
    );
  }
);

const StyledInputWrapper = styled.label<{ $width?: CSSProperties["width"] }>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  width: ${({ $width }) =>
    typeof $width === "number" ? `${$width}px` : $width};
  cursor: text;

  img {
    position: absolute;
    left: 16px;
  }
`;

const StyledInput = styled.input<{ $isSearch: boolean }>`
  width: 100%;
  height: 36px;
  padding: ${({ $isSearch }) => ($isSearch ? "8px 16px 8px 48px" : "8px 16px")};
  border: 1px solid ${themes.Color.grayScale[50]};
  border-radius: ${({ $isSearch }) => ($isSearch ? "8px" : "4px")};

  background-color: ${themes.Color.grayScale[30]};
  outline: none;

  font-size: ${({ $isSearch }) =>
    $isSearch ? themes.Font.body3 : themes.Font.body2};
  font-weight: ${themes.FontWeight.regular};

  ::placeholder {
    color: ${themes.Color.grayScale[60]};
  }
`;
