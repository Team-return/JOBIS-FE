import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 120px 0;

  background-color: ${themes.Color.grayScale[20]};
  gap: 16px;
`;

export const CompanyInfoEditButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 96px;

  background-color: ${themes.Color.grayScale[30]};
  outline: none;

  color: ${themes.Color.grayScale[60]};
  font-size: ${themes.Font.body3.fontSize};
  font-weight: ${themes.FontWeight.regular};
  line-height: ${themes.Font.body3.lineHeight};
  cursor: pointer;
`;

export const AddRecruitmentButton = styled.span`
  display: flex;
  align-items: center;
  padding: 2px 8px;
  border: 1px solid ${themes.Color.primary[20]};
  border-radius: 32px;
  gap: 3px;
  cursor: pointer;
`;

export const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 11px 12px;
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[20]};
`;

export const Button = styled.button`
  width: 310px;
  height: 68px;
  border: none;
  border-radius: 4px;

  background-color: #135c9d;

  color: white;
  font-size: 20px;
`;
