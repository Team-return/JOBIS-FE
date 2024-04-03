import { themes } from "@jobis/design-token";
import Image from "next/image";
import { styled, css } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 780px;
  padding: 30px 30px 25px;
`;

export const DndItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  margin-bottom: 5px;
  border: 1px solid ${themes.Color.grayScale[50]};
  border-radius: 8px;
  gap: 2px;
`;

export const DndWrapper = styled.div`
  width: 330px;
  height: 320px;
  margin-top: 14px;

  overflow: scroll;
`;

export const DndText = styled.div`
  margin-left: 2px;

  color: ${themes.Color.grayScale[60]};
  font-size: 14px;
  font-weight: 600;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 360px;
  margin-left: 30px;
  padding-top: 40px;

  background-color: white;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-align: left;
`;

export const ProgressListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 390px;
  height: 240px;
`;

export const Card = styled.div<{ isSelect: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid
    ${({ isSelect }) =>
      isSelect ? themes.Color.primary[20] : themes.Color.grayScale[50]};
  border-radius: 8px;

  color: ${({ isSelect }) => (isSelect ? themes.Color.primary[20] : "#A5A5A5")};
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    ${({ isSelect }) =>
      !isSelect &&
      css`
        border: 1.5px solid ${themes.Color.grayScale[60]};

        color: ${themes.Color.grayScale[70]};
      `}
  }
`;

export const SelectIconImg = styled(Image)`
  position: absolute;
  top: -7px;
  right: -7px;
`;
