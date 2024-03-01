import { styled } from "styled-components";
import ModalPortal from "./modalPortal";
import React, { MouseEvent } from "react";
import { Icon } from "@jobis/ui";
import { themes } from "@jobis/design-token";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  width: number;
  closeAble?: boolean;
}

const Modal = ({ onClose, children, width, closeAble }: ModalProps) => {
  const blockClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <ModalPortal>
      <Background onClick={onClose}>
        <ModalContainer width={width} onClick={blockClick}>
          {closeAble && (
            <Icon
              cursor="pointer"
              onClick={onClose}
              size={24}
              icon="Close"
              color={themes.Color.grayScale[60]}
              style={{ position: "absolute", top: 8, right: 8 }}
            />
          )}
          {children}
        </ModalContainer>
      </Background>
    </ModalPortal>
  );
};

export default Modal;

const Background = styled.div`
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
  z-index: 10000;
`;

const ModalContainer = styled.div<{ width: number }>`
  position: relative;
  width: ${({ width }) => width}px;
  min-height: 0px;
  background-color: white;
`;
