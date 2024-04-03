import { themes } from "@jobis/design-token";
import Image from "next/image";
import { styled } from "styled-components";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: ${themes.Color.grayScale[20]};
  gap: 16px;
  padding: 120px 0;
`;

export const AddFileButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: ${themes.Font.body2.fontSize};
  line-height: ${themes.Font.body2.lineHeight};
  font-weight: ${themes.FontWeight.regular};
  width: 604px;
  color: ${themes.Color.primary[20]};
  border-radius: 8px;
  border: 1px solid ${themes.Color.primary[20]};
  cursor: pointer;
`;

export const ImageUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 184px;
  height: 184px;
  margin-right: 420px;
  background-color: ${themes.Color.grayScale[20]};
  border-radius: 8px;
  cursor: pointer;
`;

export const LogoImage = styled(Image)`
  border-radius: 8px;
  margin-right: 420px;
  cursor: pointer;
`;

export const Select = styled.select<{ isError: boolean }>`
  border: none;
  box-shadow: none;
  outline: none;

  background-color: ${themes.Color.grayScale[20]};
  color: ${themes.Color.grayScale[80]};
  border: 2px solid
    ${({ isError }) =>
      isError ? themes.Color.subColor.red[20] : themes.Color.grayScale[20]};
  z-index: 2;
  border-radius: 8px;
  font-size: ${themes.Font.body2.fontSize};
  font-weight: ${themes.FontWeight.regular};
  line-height: ${themes.Font.body2.lineHeight};

  width: 604px;
  padding: 14px;
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
  outline: none;
  border: none;
  gap: 12px;
  padding: 4px 8px;
  border-radius: 88px;
  background-color: ${themes.Color.grayScale[30]};
`;
