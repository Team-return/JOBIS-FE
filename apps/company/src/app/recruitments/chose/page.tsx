"use client";
import * as S from "./style";
import Link from "next/link";
import { Text, Flex, useToast } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { useCheckRecruitment } from "@/hooks/apis/useRecruitmentsApi";
import { useRouter } from "next/navigation";

export default function Chose() {
  const { toast } = useToast();
  const router = useRouter();
  const { data: checkRecruitment } = useCheckRecruitment();

  const CheckToast = (winterIntern: string) => {
    return toast({
      payload: {
        type: "error",
        message: `${winterIntern.slice(-4) === "true" ? "동계 체험형" : "채용형"} 모집의뢰서가 이미 존재합니다`,
      },
    });
  };

  const handleLinkClick = (
    e: React.MouseEvent,
    condition: boolean,
    path: string
  ) => {
    if (condition) {
      e.preventDefault();
      CheckToast(path);
    } else {
      router.push(path);
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <Text fontSize="h3" fontWeight="bold" style={{ marginBottom: 4 }}>
          실습 종류 선택
        </Text>
        <Text
          fontSize="body2"
          fontWeight="regular"
          color={themes.Color.grayScale[60]}
          style={{ marginBottom: 48 }}
          whiteSpace="pre-wrap"
        >
          {
            "동계 체험형 현장실습과 채용형 현장실습 중\n한 가지를 선택해 주세요."
          }
        </Text>
        <Flex direction="column" gap={16}>
          <Link
            href={"/recruitments?winter=true"}
            onClick={e =>
              handleLinkClick(
                e,
                !!checkRecruitment?.winter_intern,
                "/recruitments?winter=true"
              )
            }
          >
            <S.WinterOption>
              <Text
                fontSize="h6"
                fontWeight="bold"
                color={themes.Color.primary[20]}
              >
                동계 체험형 현장실습 ❄️
              </Text>
              <Text
                fontSize="body3"
                fontWeight="regular"
                color={themes.Color.grayScale[60]}
                whiteSpace="pre-wrap"
              >
                2학년 학생들을 대상으로 한 현장실습이며, 겨울방학 약 6주간
                인턴형식으로 현장실습을 나갈 예정입니다.
              </Text>
            </S.WinterOption>
          </Link>
          <Link
            href={"/recruitments"}
            onClick={e =>
              handleLinkClick(
                e,
                !!checkRecruitment?.experiential,
                "/recruitments"
              )
            }
          >
            <S.RecruitOption>
              <Text
                fontSize="h6"
                fontWeight="bold"
                color={themes.Color.grayScale[10]}
              >
                채용형 현장실습 🤝
              </Text>
              <Text
                fontSize="body3"
                fontWeight="regular"
                color={themes.Color.grayScale[10]}
                whiteSpace="pre-wrap"
              >
                3학년 학생들을 대상으로 한 현장실습이며, 현장실습 이후
                근로계약으로 연계 될 예정입니다.
              </Text>
            </S.RecruitOption>
          </Link>
        </Flex>
      </S.Wrapper>
    </S.Container>
  );
}
