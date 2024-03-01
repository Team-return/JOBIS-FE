import ModalPortal from "./modalPortal";
import React, { MouseEvent } from "react";
import { Icon } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import * as S from "./style";

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
      <S.Background onClick={onClose}>
        <S.ModalContainer width={width} onClick={blockClick}>
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
        </S.ModalContainer>
      </S.Background>
    </ModalPortal>
  );
};

export default Modal;
