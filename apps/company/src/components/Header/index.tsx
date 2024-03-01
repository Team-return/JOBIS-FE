"use client";

import { styled } from "styled-components";
import Logo from "../../../public/Logo.png";
import Image from "next/image";
import { Text, HStack, theme } from "@team-return/design-system";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <Container>
        <Wrapper>
          <Link href="/">
            <Image src={Logo} width={110} height={24} alt="jobis" unoptimized />
          </Link>
          <HStack gap={52}>
            <HStack position="relative" justify="center">
              <Link href="/">
                <Text color="gray90" size="Body1" cursor="pointer">
                  모집의뢰서
                </Text>
              </Link>
              {(pathname === "/" || pathname === "/recruitments") && (
                <HeaderLine />
              )}
            </HStack>
            <HStack position="relative" justify="center">
              <Link href="/applicant">
                <Text color="gray90" size="Body1" cursor="pointer">
                  지원자
                </Text>
              </Link>
              {pathname === "/applicant" && <HeaderLine />}
            </HStack>
            <HStack position="relative" justify="center">
              <Link href="/mypage">
                <Text color="gray90" size="Body1" cursor="pointer">
                  내 기업정보
                </Text>
              </Link>
              {pathname === "/mypage" && <HeaderLine />}
            </HStack>
          </HStack>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: white;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 940px;
`;

const HeaderLine = styled.div`
  position: absolute;
  bottom: 0;
  width: 70%;
  height: 1px;
  border: 1px solid ${theme.color.liteBlue};
`;
