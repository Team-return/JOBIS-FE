import { styled } from "styled-components";
import { themes } from "@jobis/design-token";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 850px;
  padding: 48px;
  background-color: ${themes.Color.grayScale[10]};
  border-radius: 12px;
`;
