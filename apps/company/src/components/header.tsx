import { Flex, Text, useToast } from "@jobis/ui";
import Logobule from "../../public/logoBlue.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const Header = () => {
  const param = usePathname();
  const navigation = useRouter();
  const { toast } = useToast();

  // 토큰은 기업 등록을 마쳐야 발급된다. 등록 전에 메뉴로 이동하면 API가 401로 실패해
  // 로그인 화면으로 튕기므로, 이동하지 않고 먼저 등록하라고 알린다
  const goTo = (path: string) => {
    if (!cookie.get("access_token") && !cookie.get("refresh_token")) {
      toast({
        payload: {
          type: "message",
          message: "기업 정보를 먼저 등록해주세요.",
        },
      });
      return;
    }
    navigation.push(path);
  };
  return (
    <HeaderWrap>
      <Image
        src={Logobule}
        alt="자비스 로고"
        style={{ cursor: "pointer" }}
        onClick={() => goTo("/my")}
      />
      <Flex gap={48}>
        <Text
          fontSize="body2"
          style={{ cursor: "pointer" }}
          fontWeight={param.includes("my") ? "bold" : "medium"}
          onClick={() => goTo("/my")}
        >
          모집의뢰서
        </Text>
        <Text
          fontSize="body2"
          fontWeight={param.includes("company") ? "bold" : "medium"}
          style={{ cursor: "pointer" }}
          onClick={() => goTo("/company")}
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
