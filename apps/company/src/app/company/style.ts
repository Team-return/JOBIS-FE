import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 0;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1240px;

  @media (width <= 1440px) {
    width: 960px;
  }
`;

export const TitleLeftContainer = styled.div`
  display: flex;
`;

export const Line = styled.div`
  width: 1240px;
  height: 1px;
  margin: 56px;

  background-color: ${themes.Color.grayScale[40]};

  @media (width <= 1440px) {
    width: 960px;
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
