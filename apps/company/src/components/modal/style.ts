import { styled } from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 800;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  background-color: #0003;

  text-align: center;
`;

export const ModalContainer = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  min-height: 0;

  background-color: white;
`;
