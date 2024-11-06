import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Container = styled.div`
  position: absolute;
  right: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  padding-top: 16px;
  padding-bottom: 16px;
  border: 1px solid ${themes.Color.grayScale[30]};
  border-radius: 8px;

  background-color: white;
  cursor: pointer;
  gap: 16px;
  box-shadow: 0 4px 20px 0 rgb(112 144 176 / 12%);
`;
