import { useEmploymentStats } from "@/apis";
import { Text } from "@jobis/ui";
import { Loading, Stack } from "@/components";
import { ClassIdToLabelData } from "@/constants";
import styled from "styled-components";
import { themes } from "@jobis/design-token";

export const EmploymentCurrentSituation = () => {
  const { data, isPending } = useEmploymentStats();

  return (
    <Container>
      {isPending ?? <Loading />}
      {data?.classes.map(item => {
        return (
          <Stack key={item.class_id} direction="column" gap={16}>
            <Header justify="space-between">
              <Text fontSize="h6" fontWeight="bold">
                {ClassIdToLabelData[item.class_id]}
              </Text>
              <RateText
                fontSize="body3"
                fontWeight="medium"
                color={themes.Color.subColor.blue[30]}
              >
                {item.passed_students}/{item.total_students}
              </RateText>
            </Header>
            <EmploymentRateContainer>
              {item.employment_rate_response_list.map(
                (employmentRow, index) => (
                  <EmploymentRateItem key={index}>
                    <Logo
                      src={`${import.meta.env.VITE_FILE_URL}/${employmentRow.logo_url}`}
                      alt={`${employmentRow.company_name} 로고`}
                    />
                  </EmploymentRateItem>
                )
              )}
            </EmploymentRateContainer>
          </Stack>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 80%;
  margin-bottom: 110px;
  gap: 40px;
`;

const Header = styled(Stack)`
  padding-right: 17px;
`;

const EmploymentRateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 460px;
  padding: 20px 18px;
  border: 1px solid ${themes.Color.grayScale[40]};
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[10]};
  gap: 8px;
  box-shadow: 0 4px 20px
    color-mix(in srgb, ${themes.Color.subColor.blue[30]} 12%, transparent);
`;

const EmploymentRateItem = styled.div`
  width: 100px;
  height: 44px;
  padding: 4px;
  border: 1px solid ${themes.Color.grayScale[30]};
  border-radius: 8px;

  background-color: ${themes.Color.grayScale[10]};
  box-shadow: 0 4px 20px
    color-mix(in srgb, ${themes.Color.subColor.blue[30]} 12%, transparent);
`;

const RateText = styled(Text)`
  align-self: flex-end;
  margin-right: 17px;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;
