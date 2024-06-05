import {
  Stack,
  Pagination,
  Loading,
  ApplicationFilter,
  ApplicationRow,
} from "@/components";
import { Text } from "@jobis/ui";
import { css, styled } from "styled-components";
import { themes } from "@jobis/design-token";
import { ApplicationCellData } from "@/constants";
import { useEffect, useState } from "react";
import { useGetAllApplication } from "@/apis";
import { useNumCountAnimation } from "@/hooks";
import { useApplicationFilter } from "@/stores";
import { applicationStatus } from "@/@types/enums";

export const ApplicationPage = () => {
  const [page, setPage] = useState(1);
  const { applicationFilter } = useApplicationFilter();

  const {
    data: applications,
    isPending: applicationsIsPending,
    isRefetching: applicationsIsRefetching,
  } = useGetAllApplication();

  useEffect(() => {
    setPage(1);
  }, [applicationFilter]);

  const filteringApplications = applications?.applications
    .filter(
      item =>
        item.company_name.includes(applicationFilter.companyOrStudentName) ||
        item.student_name.includes(applicationFilter.companyOrStudentName)
    )
    .filter(
      item =>
        applicationFilter.status === "" ||
        applicationStatus[item.application_status] === applicationFilter.status
    );

  return (
    <Container>
      <Stack width="65%" direction="column" align="center">
        <Stack align="flex-end" gap={8}>
          <Text fontSize="h4" fontWeight="bold">
            지원서
          </Text>
          <Text fontSize="body2" style={{ marginBottom: "4px" }}>
            총{" "}
            <span style={{ color: themes.Color.subColor.blue[20] }}>
              {useNumCountAnimation(filteringApplications?.length || 0)}
            </span>
            개
          </Text>
        </Stack>
        <ApplicationFilter />
        <StyleTable>
          <TitleWrapper>
            {ApplicationCellData.map((item, idx) => (
              <Stack
                key={idx}
                width={item.width}
                justify="center"
                align="center"
              >
                {item.title}
              </Stack>
            ))}
          </TitleWrapper>
          <ContentWrapper
            $isPending={applicationsIsPending || applicationsIsRefetching}
          >
            {applicationsIsPending || applicationsIsRefetching ? (
              <Loading size={50} />
            ) : (
              filteringApplications
                ?.filter((_, idx) => page * 10 > idx && (page - 1) * 10 <= idx)
                .map(application => (
                  <ApplicationRow
                    key={application.application_id}
                    data={application}
                  />
                ))
            )}
          </ContentWrapper>
        </StyleTable>
        <Pagination
          totalItemsCount={filteringApplications?.length || 0}
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
