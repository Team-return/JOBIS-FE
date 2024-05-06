import styled from "styled-components";
import { useEffect } from "react";
import { BigButton } from "@/components";
import { Text } from "@jobis/ui";
import { useModal } from "@/stores";

export const Modal = () => {
  const { isOpen, modalData, closeModal } = useModal(state => ({
    isOpen: state.isOpen,
    modalData: state.modalData,
    closeModal: state.closeModal,
  }));

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
