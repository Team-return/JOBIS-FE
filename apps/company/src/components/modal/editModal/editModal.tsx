"use client";

import React from "react";
import * as S from "./style";
import { Text } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import Link from "next/link";
import { useMyCompanyInfo } from "@/hooks/apis/useCompanyApi";
import { useEffect } from "react";

interface PropsType {
  closeModal: () => void;
}

const EditModal: React.FC<PropsType> = () => {
  const { data: myCompanyInfo } = useMyCompanyInfo();
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
      <Text fontSize="caption" color={themes.Color.grayScale[60]}>
        로그아웃
      </Text>
    </S.Container>
  );
};

export default EditModal;
