import { themes } from "@jobis/design-token";
import Image from "next/image";
import { styled } from "styled-components";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 120px 0;

  background-color: ${themes.Color.grayScale[20]};
  gap: 16px;
`;

export const AddFileButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 604px;
  padding: 12px;
  border: 1px solid ${themes.Color.primary[20]};
  border-radius: 8px;

  color: ${themes.Color.primary[20]};
  font-size: ${themes.Font.body2.fontSize};
  font-weight: ${themes.FontWeight.regular};
  line-height: ${themes.Font.body2.lineHeight};
  cursor: pointer;
`;

export const ImageUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 184px;
  height: 184px;
  margin-right: 420px;
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[20]};
  cursor: pointer;
`;

export const LogoImage = styled(Image)`
  margin-right: 420px;
  border-radius: 8px;
  cursor: pointer;
`;

export const Select = styled.select<{ isError: boolean }>`
  z-index: 2;

  width: 604px;
  padding: 14px;
  border: none;
  border: 2px solid
    ${({ isError }) =>
      isError ? themes.Color.subColor.red[20] : themes.Color.grayScale[20]};
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[20]};
  outline: none;

  color: ${themes.Color.grayScale[80]};
  font-size: ${themes.Font.body2.fontSize};
  font-weight: ${themes.FontWeight.regular};
  line-height: ${themes.Font.body2.lineHeight};
  box-shadow: none;

  &::placeholder {
    color: ${themes.Color.grayScale[50]};
  }
`;

export const Option = styled.option`
  font-size: ${themes.Font.body2.fontSize};
  font-weight: ${themes.FontWeight.regular};
  line-height: ${themes.Font.body2.lineHeight};
`;

export const FileWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border: none;
  border-radius: 88px;

  background-color: ${themes.Color.grayScale[30]};
  outline: none;
  gap: 12px;
`;
