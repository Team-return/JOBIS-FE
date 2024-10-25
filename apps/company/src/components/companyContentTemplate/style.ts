import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 28px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 108px;
  height: 42px;
  border-radius: 8px;

  background-color: ${themes.Color.primary[10]};

  color: ${themes.Color.primary[20]};
  user-select: none;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  color: ${themes.Color.grayScale[70]};
  line-height: 26px;
  max-width: 488px;
  min-width: 352px;
  min-height: 42px;

  @media (width <= 1440px) {
    max-width: 340px;
    min-width: 222px;
  }
`;
