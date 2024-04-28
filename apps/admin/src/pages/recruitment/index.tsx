import { Header, Recruitment } from "@/components";
import { Footer } from "@jobis/ui";
import { styled } from "styled-components";

export const RecruitmentPage = () => {
  return (
    <Container>
      <Header />
      <Recruitment />
      <Footer />
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
