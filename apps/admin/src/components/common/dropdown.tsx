import { ChevronIcon } from "@assets/images";
import { themes } from "@jobis/design-token";
import { Text } from "@jobis/ui";
import {
  forwardRef,
  useState,
  type ForwardedRef,
  type CSSProperties,
} from "react";
import { styled } from "styled-components";
import { Stack } from "@/components";
import OutsideClickHandler from "react-outside-click-handler";

type PropsType = {
  placeholder: string;
  width: CSSProperties["width"];
  value: string | number;
  options: string[] | number[];
  changeHandler: (e: string | number) => void;
  isChangeBtn?: boolean;
  disabled?: boolean;
};

export const Dropdown = forwardRef(
  (
    {
      placeholder,
      width,
      value,
      options,
      changeHandler,
      isChangeBtn = false,
      disabled = false,
    }: PropsType,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsOpen(false);
        }}
      >
        <Stack position="relative" width={width}>
          <Container
            $width={width}
            ref={ref}
            onClick={() => {
              !disabled && setIsOpen(prev => !prev);
            }}
            $isChangeBtn={isChangeBtn}
            $disabled={disabled}
          >
            <Text
              fontSize="body3"
              fontWeight="regular"
              color={
                isChangeBtn || value
                  ? themes.Color.primary[20]
                  : themes.Color.grayScale[60]
              }
            >
              {value || placeholder}
            </Text>
            <ChevronImg
              $isopen={isOpen}
              stroke={
                isChangeBtn
                  ? themes.Color.primary[20]
                  : themes.Color.grayScale[60]
              }
            />
          </Container>
          {isOpen && (
            <ListWrapper $width={width}>
              {options.map((option, idx) => (
                <StyleText
                  key={idx}
                  fontSize="body2"
                  fontWeight="medium"
                  onClick={() => {
                    changeHandler(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </StyleText>
              ))}
            </ListWrapper>
          )}
        </Stack>
      </OutsideClickHandler>
    );
  }
);

const Container = styled.div<{
  $width: CSSProperties["width"];
  $isChangeBtn: boolean;
  $disabled: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ $width }) =>
    typeof $width === "number" ? `${$width}px` : $width};
  height: 36px;
  padding: 8px;
  border: 1px solid
    ${({ $isChangeBtn }) =>
      $isChangeBtn ? themes.Color.primary[20] : themes.Color.grayScale[50]};
  border-radius: 8px;
  gap: 8px;

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

const ChevronImg = styled(ChevronIcon)<{ $isopen: boolean }>`
  rotate: ${({ $isopen }) => ($isopen ? "180deg" : "0deg")};

  transition-duration: 0.5s;
`;

const ListWrapper = styled.ul<{ $width: CSSProperties["width"] }>`
  position: absolute;
  top: 40px;
  left: 0;
  display: flex;
  z-index: 1;
  flex-direction: column;
  align-items: center;
  width: 120px;
  padding: 16px 0;
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[10]};
  overflow: scroll;
  max-height: 160px;
  gap: 16px;
  box-shadow: 0 4px 20px 0 rgb(112 144 176 / 15%);
`;

const StyleText = styled(Text)`
  color: ${themes.Color.grayScale[50]};
  cursor: pointer;

  &:hover {
    color: ${themes.Color.primary[20]};
  }
`;
