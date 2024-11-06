"use client";

import Image from "next/image";
import * as S from "./style";
import { Text, Flex, Icon } from "@jobis/ui";
import SeeMoreIcon from "../../../public/seemore.svg";
import { themes } from "@jobis/design-token";
import { CompanyContentTemplate } from "@/components/companyContentTemplate";
import { useMyCompanyInfo } from "@/hooks/apis/useCompanyApi";
import { useModal } from "@/hooks/useModal";
import EditModal from "@/components/modal/editModal/editModal";

export default function Company() {
  const { data: myCompanyInfo } = useMyCompanyInfo();
  const { modalState, closeModal, openModal } = useModal();

  const handleIconClick = () => {
    if (modalState === "EDIT_COMPANY_INFO") {
      closeModal();
    } else {
      openModal("EDIT_COMPANY_INFO");
    }
  };

  return (
    <S.Container>
      <S.Title>
        <Flex gap={24}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${myCompanyInfo?.company_logo_url}`}
            width={72}
            height={72}
            style={{
              borderRadius: 10,
              boxShadow: "0px 4px 20px 0px rgba(112, 144, 176, 0.15)",
            }}
            alt="회사 로고"
          />
          <div>
            <Text fontSize="h4" fontWeight="bold">
              {myCompanyInfo?.name}
            </Text>
            <Text fontSize="body2" color={themes.Color.grayScale[60]}>
              사업자 번호 : {myCompanyInfo?.biz_no}
            </Text>
          </div>
        </Flex>
        <S.IconWrapper>
          <Image
            src={SeeMoreIcon}
            alt="더보기"
            style={{ cursor: "pointer" }}
            onClick={() => handleIconClick()}
          />
          {modalState === "EDIT_COMPANY_INFO" && (
            <EditModal closeModal={closeModal} />
          )}
        </S.IconWrapper>
      </S.Title>
      <S.Line />
      <Flex gap={128} justify={"space-between"}>
        <Flex direction={"column"} gap={32}>
          <CompanyContentTemplate
            title="대표 서비스명"
            content={myCompanyInfo?.service_name}
          />
          <CompanyContentTemplate
            title="회사개요"
            content={myCompanyInfo?.company_introduce}
          />
          <CompanyContentTemplate
            title={myCompanyInfo?.headquarter === true ? "주소(본사)" : "주소"}
            content={myCompanyInfo?.main_address}
          />
          <CompanyContentTemplate
            title="대표"
            content={myCompanyInfo?.representative}
          />
          <CompanyContentTemplate
            title="설립일"
            content={myCompanyInfo?.founded_at}
          />
          <CompanyContentTemplate
            title="담당자"
            content={myCompanyInfo?.manager_name}
          />
          <CompanyContentTemplate
            title="담당자 연락처"
            content={myCompanyInfo?.manager_phone_no}
          />
          <CompanyContentTemplate
            title="이메일"
            content={myCompanyInfo?.email}
          />
        </Flex>
        <Flex direction={"column"} gap={32}>
          <CompanyContentTemplate
            title="사업 분야"
            content={myCompanyInfo?.business_area}
          />
          <CompanyContentTemplate
            title="매출액"
            content={`${myCompanyInfo?.take}억`}
          />
          <CompanyContentTemplate
            title="사업자번호"
            content={myCompanyInfo?.biz_no}
          />
          <CompanyContentTemplate
            title="근로자 수"
            content={`${myCompanyInfo?.workers_count}명`}
          />
          <CompanyContentTemplate
            title="대표 번호"
            content={myCompanyInfo?.representative_phone_no}
          />
          <CompanyContentTemplate
            title="사업자 등록증"
            content={
              myCompanyInfo?.biz_registration_url ? (
                <S.FileWrapper type="button">
                  <Flex align="center" gap={4}>
                    <Icon
                      icon="FileEarmarkArrowDown"
                      size={16}
                      color={themes.Color.grayScale[60]}
                    />
                    <Text
                      fontSize="body3"
                      fontWeight="regular"
                      color={themes.Color.grayScale[60]}
                      whiteSpace="nowrap"
                      style={{ textOverflow: "ellipsis", maxWidth: 500 }}
                    >
                      {myCompanyInfo.biz_registration_url
                        .split("/")
                        .pop()
                        ?.replace(/^[\w-]+-/, "")}
                    </Text>
                  </Flex>
                </S.FileWrapper>
              ) : null
            }
          />
          <CompanyContentTemplate
            title="파일첨부"
            content={
              myCompanyInfo?.attachment_urls &&
              myCompanyInfo.attachment_urls.length > 0
                ? myCompanyInfo.attachment_urls.map((file, idx) => (
                    <S.FileWrapper type="button" key={idx}>
                      <Flex align="center" gap={4}>
                        <Icon
                          icon="FileEarmarkArrowDown"
                          size={16}
                          color={themes.Color.grayScale[60]}
                        />
                        <Text
                          fontSize="body3"
                          fontWeight="regular"
                          color={themes.Color.grayScale[60]}
                          whiteSpace="nowrap"
                          style={{ textOverflow: "ellipsis", maxWidth: 500 }}
                        >
                          {file
                            .split("/")
                            .pop()
                            ?.replace(/^[\w-]+-/, "")}
                        </Text>
                      </Flex>
                    </S.FileWrapper>
                  ))
                : null
            }
          />
        </Flex>
      </Flex>
    </S.Container>
  );
}
