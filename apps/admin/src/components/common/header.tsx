import { Logo } from "@/assets/images";
import { styled } from "styled-components";
import { Text } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Container>
      <img src={Logo} alt="로고" width={100} height={32} />
      <NavWrapper>
        <Text
          fontSize="body1"
          fontWeight="medium"
          color={
            location.pathname.includes("recruitment")
              ? themes.Color.grayScale[90]
              : themes.Color.grayScale[50]
          }
          onClick={() => {
            navigate("/recruitment");
          }}
        >
          모집의뢰서
        </Text>
        <Text
          fontSize="body1"
          fontWeight="medium"
          color={
            location.pathname.includes("company")
              ? themes.Color.grayScale[90]
              : themes.Color.grayScale[50]
          }
          onClick={() => {
            navigate("/company");
          }}
        >
          기업
        </Text>
        <Text
          fontSize="body1"
          fontWeight="medium"
          color={
            location.pathname.includes("student")
              ? themes.Color.grayScale[90]
              : themes.Color.grayScale[50]
          }
          onClick={() => {
            navigate("/student");
          }}
        >
          학생
        </Text>
        <Text
          fontSize="body1"
          fontWeight="medium"
          color={
            location.pathname.includes("application")
              ? themes.Color.grayScale[90]
              : themes.Color.grayScale[50]
          }
          onClick={() => {
            navigate("/application");
          }}
        >
          지원서
        </Text>
      </NavWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  z-index: 1;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 70px;

  background-color: ${themes.Color.grayScale[10]};
  box-shadow: 0 0 4px 0 rgb(112 144 176 / 12%);
`;

const NavWrapper = styled.nav`
  display: flex;
  gap: 34px;

  * {
    cursor: pointer;
  }
`;
