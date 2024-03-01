import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${themes.Color.grayScale[30]};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 660px;
  height: 826px;
  padding: 60px;
  background-color: ${themes.Color.grayScale[10]};
`;

export const WinterOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 20px 99px 52px 20px;
  width: 100%;
  border-radius: 8px;
  background-color: ${themes.Color.grayScale[10]};
  border: 1px solid ${themes.Color.primary[20]};
  cursor: pointer;
`;

export const RecruitOption = styled(WinterOption)`
  background-color: ${themes.Color.primary[20]};
`;
