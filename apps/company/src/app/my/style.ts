import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${themes.Color.grayScale[20]};
  gap: 16px;
  padding: 120px 0;
`;

export const CompanyInfoEditButton = styled.button`
  outline: none;
  border: none;
  background-color: ${themes.Color.grayScale[30]};
  color: ${themes.Color.grayScale[60]};
  padding: 8px 12px;
  border-radius: 96px;
  font-size: ${themes.Font.body3.fontSize};
  line-height: ${themes.Font.body3.lineHeight};
  font-weight: ${themes.FontWeight.regular};
  cursor: pointer;
`;

export const AddRecruitmentButton = styled.span`
  display: flex;
  align-items: center;
  border-radius: 32px;
  gap: 3px;
  padding: 2px 8px;
  border: 1px solid ${themes.Color.primary[20]};
  cursor: pointer;
`;

export const CompanyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 12px;
  width: 100%;
  background-color: ${themes.Color.grayScale[20]};
  border-radius: 8px;
`;
