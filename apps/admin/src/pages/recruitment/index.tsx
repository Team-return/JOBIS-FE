import { Recruitment } from "@/components";
import { styled } from "styled-components";

export const RecruitmentPage = () => {
  return (
    <Container>
      <Recruitment />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
