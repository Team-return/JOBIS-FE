/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { BigButton } from "@/components";
import { Text } from "@jobis/ui";

type ModalData = {
  children?: ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
  onReset?: () => void;
};

const ModalContext = createContext<{
  isOpen: boolean;
  openModal: (modalData: ModalData) => void;
  closeModal: () => void;
  modalData: ModalData;
}>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalData: {} as ModalData,
});

/** 모달 Provider입니다. */
export const ModalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({});

  const openModal = ({ children, onCancel, onSubmit, onReset }: ModalData) => {
    setIsOpen(true);
    setModalData({
      children,
      onCancel,
      onSubmit,
      onReset,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData({});
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalData }}>
      {children}
    </ModalContext.Provider>
  );
};

/** 모달을 관리하기 위한 state입니다. */
export const useModalContext = () => useContext(ModalContext);

/** 기본 모달 틀을 지원하고 모달을 켜고 닫는 역할을 합니다. */
export const Modal = () => {
  const { isOpen, modalData, closeModal } = useModalContext();

  const { children, onCancel, onSubmit, onReset } = modalData;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <Modals>
      <ModalDropdown
        onClick={() => {
          closeModal();
          onReset?.();
        }}
      />
      <ModalContents>
        <div>{children}</div>
        {onCancel && onSubmit && (
          <ModalActions>
            <BigButton
              width={122}
              height={48}
              onClick={() => {
                onCancel();
                onReset?.();
              }}
            >
              <Text fontSize="body2" fontWeight="bold">
                취소
              </Text>
            </BigButton>
            <BigButton
              width={122}
              height={48}
              variant="primary"
              onClick={() => {
                onSubmit();
              }}
            >
              <Text fontSize="body2" fontWeight="bold">
                확인
              </Text>
            </BigButton>
          </ModalActions>
        )}
      </ModalContents>
    </Modals>
  );
};

const Modals = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;

  background-color: rgb(0 0 0 / 60%);
`;

const ModalDropdown = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ModalContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  border-radius: 4px;

  /* overflow-y: scroll; */
  background-color: #fff;
  min-width: 370px;
  box-shadow: 0 0 10px rgb(0 0 0 / 25%);
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
`;
