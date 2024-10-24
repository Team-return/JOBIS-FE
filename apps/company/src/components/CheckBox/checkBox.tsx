import { themes } from "@jobis/design-token";
import { Text } from "@jobis/ui";
import { forwardRef, type InputHTMLAttributes, type ForwardedRef } from "react";
import { css, styled } from "styled-components";

type PropsType = {
  label?: string;
  width?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef(
  (
    { label, width, ...props }: PropsType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <CheckboxWrapper $width={width}>
        <StyleCheckbox type="checkbox" ref={ref} {...props} />
        <Text
          fontSize="body2"
          fontWeight="regular"
          color={themes.Color.grayScale[50]}
        >
          {label}
        </Text>
      </CheckboxWrapper>
    );
  }
);

const CheckboxWrapper = styled.label<{ $width?: string }>`
  display: flex;
  align-items: center;
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  gap: 10px;
  cursor: pointer;
`;

const StyleCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${themes.Color.grayScale[40]};
  border-radius: 4px;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background: url('/checkImg.svg');
    background-color: ${themes.Color.primary[20]};
    background-position: 50%;
    background-size: 14px 14px;
    background-repeat: no-repeat;
  }
`;
