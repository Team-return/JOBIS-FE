/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ArrowIcon } from "@assets/images";
import { themes } from "@jobis/design-token";

type PropsType = {
  totalItemsCount: number;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
};

/** 페이지네이션을 구현한 함수입니다. */
export function Pagination({
  totalItemsCount,
  activePage,
  setActivePage,
}: PropsType) {
  const changePageNumber = (num: number) => {
    setActivePage(num);
  };

  return (
    <Nav>
      <Button
        onClick={() => changePageNumber(activePage - 1)}
        disabled={activePage === 1}
      >
        <ArrowImg src={ArrowIcon} alt="화살표" />
      </Button>
      {Array.from({ length: Math.ceil(totalItemsCount / 10) || 1 }, (_, i) => (
        <Text
          key={i + 1}
          onClick={() => changePageNumber(i + 1)}
          $isFocus={activePage === i + 1}
        >
          {i + 1}
        </Text>
      ))}
      <Button
        onClick={() => changePageNumber(activePage + 1)}
        disabled={activePage === Math.ceil(totalItemsCount / 10)}
      >
        <ArrowImg src={ArrowIcon} alt="화살표" style={{ rotate: "180deg" }} />
      </Button>
    </Nav>
  );
}

const Text = styled.div<{ $isFocus: boolean }>`
  color: ${({ $isFocus }) => ($isFocus ? "#111111" : "#7f7f7f")};
  font-size: ${themes.Font.body2};
  font-weight: ${themes.FontWeight.medium};
  cursor: pointer;

  &:hover {
    cursor: ${({ $isFocus }) => ($isFocus ? "not-allowed" : "pointer")};

    text-decoration: ${({ $isFocus }) => ($isFocus ? "none" : "underline")};
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 40px 0 120px;
`;

const Button = styled.button`
  margin: 0;
  padding: 8px;
  border: none;
  border-radius: 8px;

  background-color: transparent;

  color: #7f7f7f;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: black;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const ArrowImg = styled.img`
  margin-bottom: -3px;
`;
