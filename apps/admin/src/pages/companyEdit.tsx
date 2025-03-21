import { CompanyEdit } from "@/components";
import { styled } from "styled-components";

export const CompanyEditPage = () => {
  return (
    <Container>
      <CompanyEdit />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 70px;
  margin-bottom: 112px;
  padding-top: 56px;
  min-width: 1200px;
`;
