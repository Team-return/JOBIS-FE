import { Stack, EmploymentStatus } from "@/components";
import { themes } from "@jobis/design-token";
import { Text } from "@jobis/ui";
import { useState } from "react";
import { styled } from "styled-components";
import { StudentTabItemData } from "@/constants";

export const StudentPage = () => {
  const [selectedTap, setSelectedTap] = useState(3);

  return (
    <Container>
      <Stack width="60%" direction="column" align="center" gap={16}>
        <Stack position="relative" direction="row" gap={16}>
          {StudentTabItemData.map((label, index) => (
            <TapItem
              key={index}
              fontSize="h4"
              fontWeight="bold"
              color={
                selectedTap == index
                  ? themes.Color.grayScale[90]
                  : themes.Color.grayScale[50]
              }
              onClick={() => setSelectedTap(index)}
            >
              {label}
            </TapItem>
          ))}
        </Stack>
        <EmploymentStatus />
      </Stack>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-width: 1200px;
  margin-top: 70px;
  padding-top: 56px;
`;

const TapItem = styled(Text)`
  cursor: pointer;
`;
