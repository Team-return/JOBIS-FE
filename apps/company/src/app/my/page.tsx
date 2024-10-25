"use client";

import { SubTitleTemplate } from "@/components/subTitleTemplate";
import * as S from "./style";
import { Icon, Text, Flex, Button } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { useRouter } from "next/navigation";
import { useMyCompanyInfo } from "@/hooks/apis/useCompanyApi";
import { useMyRecruitmentList } from "@/hooks/apis/useRecruitmentsApi";
import { regex } from "@/utils/regex";
import Link from "next/link";
import Image from "next/image";
import XIcon from "../../../public/No.svg";

export default function My() {
  const router = useRouter();
  const { data: myCompanyInfo } = useMyCompanyInfo();
  const { data: myRecruitmentList } = useMyRecruitmentList();

  const hasRecruitments = myRecruitmentList?.my_recruitments;

  return (
    <S.Container>
      {hasRecruitments ? (
        <>
          <SubTitleTemplate
            title="기업정보"
            button={
              <S.CompanyInfoEditButton
                type="button"
                onClick={() =>
                  router.push(
                    `/registration?name=${myCompanyInfo?.name}&business-number=${myCompanyInfo?.biz_no}&type=edit`
                  )
                }
              >
                수정
              </S.CompanyInfoEditButton>
            }
            components={[
              <S.CompanyInfo key="company-info">
                <Text
                  fontSize="body1"
                  fontWeight="regular"
                  color={themes.Color.grayScale[70]}
                >
                  {`사업자번호 : ${regex.buisness_number(myCompanyInfo?.biz_no || "")}`}
                </Text>
                <Text
                  fontSize="body1"
                  fontWeight="regular"
                  color={themes.Color.primary[20]}
                >
                  {myCompanyInfo?.name || ""}
                </Text>
              </S.CompanyInfo>,
            ]}
          />
          <SubTitleTemplate
            title="모집의뢰서"
            button={
              <Link href="/recruitments/chose">
                <S.AddRecruitmentButton>
                  <Icon
                    icon="Plus"
                    size={16}
                    color={themes.Color.primary[20]}
                  />
                  <Text
                    fontSize="body3"
                    fontWeight="medium"
                    color={themes.Color.primary[20]}
                  >
                    추가
                  </Text>
                </S.AddRecruitmentButton>
              </Link>
            }
            components={myRecruitmentList.my_recruitments.map(recruitment => (
              <Flex align="center" gap={14} key={recruitment.id}>
                <S.CompanyInfo>
                  <Flex align="center" gap={12}>
                    <Icon icon="Recruitment" color={themes.Color.primary[20]} />
                    <Text
                      fontSize="body2"
                      fontWeight="regular"
                      color={themes.Color.grayScale[70]}
                    >
                      채용분야 :{" "}
                      {`${recruitment.recruitment_areas.jobs.join(" / ")} (${recruitment.recruitment_areas.hiring})`}
                    </Text>
                  </Flex>
                  <Text
                    fontSize="body2"
                    fontWeight="regular"
                    color={themes.Color.grayScale[60]}
                  >
                    생성일 : {recruitment.created_at.slice(0, 10)}
                  </Text>
                </S.CompanyInfo>
                <Icon
                  icon="EditPencil"
                  size={24}
                  color={themes.Color.grayScale[60]}
                  cursor="pointer"
                  onClick={() => router.push(`/recruitments/${recruitment.id}`)}
                />
              </Flex>
            ))}
          />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Image
            src={XIcon}
            alt="No Recruitment Icon"
            width={165}
            height={165}
          />
          <Text
            fontSize="h3"
            fontWeight="medium"
            color={themes.Color.grayScale[60]}
          >
            모집 의뢰서가 없습니다.
          </Text>
          <S.Button>추가하기</S.Button>
        </div>
      )}
    </S.Container>
  );
}
