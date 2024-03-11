import { styled } from "styled-components";

export const Background = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: #00000033;
  z-index: 800;
`;

export const ModalContainer = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  min-height: 0px;
  background-color: white;
`;
