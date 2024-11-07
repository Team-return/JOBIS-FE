import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: ${themes.Color.grayScale[30]};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 660px;
  height: 826px;
  margin-top: 88px;
  padding: 60px;

  background-color: ${themes.Color.grayScale[10]};
`;

export const WinterOption = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 99px 52px 20px;
  border: 1px solid ${themes.Color.primary[20]};
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[10]};
  gap: 4px;
  cursor: pointer;
`;

export const RecruitOption = styled(WinterOption)`
  background-color: ${themes.Color.primary[20]};
`;
