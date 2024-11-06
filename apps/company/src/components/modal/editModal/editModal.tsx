// EditModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import * as S from "./style";
import { Text } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import Link from "next/link";
import { useMyCompanyInfo } from "@/hooks/apis/useCompanyApi";
import Modal from "..";
import LogoutModal from "../logout/logoutModal";

interface PropsType {
  closeModal: () => void;
}

const EditModal: React.FC<PropsType> = () => {
  const { data: myCompanyInfo } = useMyCompanyInfo();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <S.Container>
      <Link
        style={{ width: "100%", height: "100%" }}
        href={`/registration?name=${myCompanyInfo?.name}&business-number=${myCompanyInfo?.biz_no}&type=edit`}
      >
        <S.Box>
          <Text fontSize="caption" color={themes.Color.grayScale[60]}>
            수정
          </Text>
        </S.Box>
      </Link>
      <S.Box onClick={handleLogoutClick}>
        <Text fontSize="caption" color={themes.Color.grayScale[60]}>
          로그아웃
        </Text>
      </S.Box>
      {isLogoutModalOpen && (
        <Modal width={380} onClose={handleCloseModal}>
          <LogoutModal />
        </Modal>
      )}
    </S.Container>
  );
};

export default EditModal;
