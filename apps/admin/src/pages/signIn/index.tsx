import { SignIn } from "@/components";
import { styled } from "styled-components";

export const SignInPage = () => {
  return (
    <Container>
      <SignIn />
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
