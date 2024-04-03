import { styled } from "styled-components";
import { themes } from "@jobis/design-token";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 850px;
  padding: 48px 0;
  border-radius: 12px;

  background-color: ${themes.Color.grayScale[10]};
  gap: 12px;
`;
