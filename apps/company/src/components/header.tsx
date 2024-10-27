import { Flex, Text } from "@jobis/ui";
import Logobule from "../../public/logoBlue.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";

export const Header = () => {
  const param = usePathname();
  const navigation = useRouter();
  return (
    <HeaderWrap>
      <Image
        src={Logobule}
        alt="자비스 로고"
        style={{ cursor: "pointer" }}
        onClick={() => navigation.push("/my")}
      />
      <Flex gap={48}>
        <Text
          fontSize="body2"
          style={{ cursor: "pointer" }}
          fontWeight={param.includes("my") ? "bold" : "medium"}
          onClick={() => navigation.push("/my")}
        >
          모집의뢰서
        </Text>
        <Text
          fontSize="body2"
          fontWeight={param.includes("company") ? "bold" : "medium"}
          style={{ cursor: "pointer" }}
          onClick={() => navigation.push("/company")}
        >
          내 기업정보
        </Text>
      </Flex>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  position: fixed;
  display: flex;
  z-index: 99;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 22px 340px;

  background-color: #fff;

  @media (width <= 1440px) {
    padding: 22px 240px;
  }
`;
