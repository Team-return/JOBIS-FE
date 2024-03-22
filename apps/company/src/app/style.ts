import styled from "styled-components";
import { themes } from "@jobis/design-token";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${themes.Color.grayScale[20]};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 36px 32px;
  border-radius: 12px;
  background-color: ${themes.Color.grayScale[10]};
  box-shadow: 0px 4px 20px 0px rgba(112, 144, 176, 0.12);
`;
