import {
  Stack,
  Pagination,
  Loading,
  CompanyFilter,
  CompanyRow,
} from "@/components";
import { Text } from "@jobis/ui";
import { css, styled } from "styled-components";
import { themes } from "@jobis/design-token";
import { CompanyCellData } from "@/constants";
import { useEffect, useState, type CSSProperties } from "react";
import { useGetAllCompany } from "@/apis";
import { useNumCountAnimation } from "@/hooks";
import { useCompanyFilter } from "@/stores";
import { CompanyTypeEnToKr } from "@@types/enums";

export const CompanyPage = () => {
  const [page, setPage] = useState(1);
  const { companyFilter } = useCompanyFilter();

  const {
    data: companies,
    isPending: companiesIsPending,
    isRefetching: companiesIsRefetching,
  } = useGetAllCompany();

  useEffect(() => {
    setPage(1);
  }, [companyFilter]);

  const justify = (idx: number): CSSProperties["justifyContent"] => {
    if (idx === 0) {
      return "flex-start";
    } else if (idx === CompanyCellData.length - 1) {
      return "flex-end";
    } else {
      return "center";
    }
  };

  const filteringCompanies = companies?.companies
    .filter(
      item =>
        !companyFilter.region || item.region.includes(companyFilter.region)
    )
    .filter(
      item =>
        !companyFilter.businessArea ||
        item.business_area.includes(companyFilter.businessArea)
    )
    .filter(item =>
      companyFilter.division
        ? companyFilter.division === "협약기업"
          ? item.convention
          : CompanyTypeEnToKr[item.company_type] === companyFilter.division
        : true
    )
    .filter(item => item.company_name.includes(companyFilter.companyName));

  return (
    <Container>
      <Stack width="65%" direction="column" align="center">
        <Stack align="flex-end" gap={8}>
          <Text fontSize="h4" fontWeight="bold">
            기업
          </Text>
          <Text fontSize="body2" style={{ marginBottom: "4px" }}>
            총{" "}
            <span style={{ color: themes.Color.subColor.blue[20] }}>
              {useNumCountAnimation(filteringCompanies?.length || 0)}
            </span>
            개
          </Text>
        </Stack>
        <CompanyFilter />
        <StyleTable>
          <TitleWrapper>
            {CompanyCellData.map((item, idx) => (
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
            $isPending={companiesIsPending || companiesIsRefetching}
          >
            {companiesIsPending || companiesIsRefetching ? (
              <Loading size={50} />
            ) : (
              filteringCompanies
                ?.filter((_, idx) => page * 10 > idx && (page - 1) * 10 <= idx)
                .map(company => (
                  <CompanyRow key={company.company_id} data={company} />
                ))
            )}
          </ContentWrapper>
        </StyleTable>
        <Pagination
          totalItemsCount={filteringCompanies?.length || 0}
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
