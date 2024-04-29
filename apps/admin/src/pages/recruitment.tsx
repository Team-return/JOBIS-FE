import {
  RecruitmentFilter,
  RecruitmentRow,
  Stack,
  Pagination,
  Loading,
} from "@/components";
import { Text } from "@jobis/ui";
import { css, styled } from "styled-components";
import { themes } from "@jobis/design-token";
import { RecruitmentCellData } from "@/constants";
import { useEffect, useState, type CSSProperties } from "react";
import { useGetAllRecruitmentForm } from "@/apis";
import { useNumCountAnimation } from "@/hooks";
import { useRecruitmentFilter } from "@/stores";
import { CompanyStatusKrToEn } from "@@types/enums";

export const RecruitmentPage = () => {
  const [page, setPage] = useState(1);
  const { recruitmentFilter } = useRecruitmentFilter();

  const {
    data: recruitmentForms,
    isPending: recruitmentFormsIsPending,
    isRefetching: recruitmentFormsIsRefetching,
    refetch: recruitmentFormsRefetch,
  } = useGetAllRecruitmentForm({
    year: +recruitmentFilter.year,
    winterIntern: recruitmentFilter.winterIntern,
  });

  useEffect(() => {
    recruitmentFormsRefetch();
  }, [
    recruitmentFilter.year,
    recruitmentFilter.winterIntern,
    recruitmentFormsRefetch,
  ]);

  useEffect(() => {
    setPage(1);
  }, [recruitmentFilter]);

  const justify = (idx: number): CSSProperties["justifyContent"] => {
    if (idx === 0) {
      return "flex-start";
    } else if (idx === RecruitmentCellData.length - 1) {
      return "flex-end";
    } else {
      return "center";
    }
  };

  const dateFilter = (type: "start" | "end", date: string | null) => {
    switch (recruitmentFilter.startDate) {
      case "":
        return true;

      case null:
        return date === null;

      default:
        return type === "start"
          ? new Date(date!) <= new Date(recruitmentFilter.startDate)
          : new Date(date!) >= new Date(recruitmentFilter.endDate!);
    }
  };

  const filteringRecruitments = recruitmentForms?.recruitments
    .filter(item => item.company_name.includes(recruitmentFilter.companyName))
    .filter(item => dateFilter("start", item.start_date))
    .filter(item => dateFilter("end", item.end_date))
    .filter(
      item =>
        !CompanyStatusKrToEn[recruitmentFilter.recruitmentStatus || "전체"] ||
        item.status ===
          CompanyStatusKrToEn[recruitmentFilter.recruitmentStatus || "전체"]
    );

  return (
    <Container>
      <Stack width="65%" direction="column" align="center">
        <Stack align="flex-end" gap={8}>
          <Text fontSize="h4" fontWeight="bold">
            모집의뢰서
          </Text>
          <Text fontSize="body2" style={{ marginBottom: "4px" }}>
            총{" "}
            <span style={{ color: themes.Color.subColor.blue[20] }}>
              {useNumCountAnimation(filteringRecruitments?.length || 0)}
            </span>
            개
          </Text>
        </Stack>
        <RecruitmentFilter />
        <StyleTable>
          <TitleWrapper>
            {RecruitmentCellData.map((item, idx) => (
              <Stack
                key={idx}
                width={item.width}
                justify={justify(idx)}
                align="center"
              >
                {item.title}
              </Stack>
            ))}
          </TitleWrapper>
          <ContentWrapper
            $isPending={
              recruitmentFormsIsPending || recruitmentFormsIsRefetching
            }
          >
            {recruitmentFormsIsPending || recruitmentFormsIsRefetching ? (
              <Loading size={50} />
            ) : (
              filteringRecruitments
                ?.filter((_, idx) => page * 10 > idx && (page - 1) * 10 <= idx)
                .map(recruitment => (
                  <RecruitmentRow key={recruitment.id} data={recruitment} />
                ))
            )}
          </ContentWrapper>
        </StyleTable>
        <Pagination
          totalItemsCount={filteringRecruitments?.length || 0}
          activePage={page}
          setActivePage={setPage}
        />
      </Stack>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 70px;
  padding-top: 56px;
`;

const StyleTable = styled.div`
  width: 100%;
  height: 840px;
`;

const TitleWrapper = styled.div`
  display: flex;
  height: 40px;
  border-bottom: 1px solid ${themes.Color.grayScale[40]};

  color: ${themes.Color.grayScale[60]};
  font-size: ${themes.Font.body2};
  font-weight: ${themes.FontWeight.medium};
`;

const ContentWrapper = styled.div<{ $isPending: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ $isPending }) =>
    $isPending &&
    css`
      height: 640px;
    `}

  color: ${themes.Color.grayScale[60]};
  font-size: ${themes.Font.body2};
  font-weight: ${themes.FontWeight.medium};
`;
