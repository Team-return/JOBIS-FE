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
  border: 1px solid ${themes.Color.grayScale[50]};
  width: 300px;
  height: 50px;
  border-radius: 8px;
  margin-bottom: 5px;
  gap: 2px;
`;

export const DndWrapper = styled.div`
  margin-top: 14px;
  width: 330px;
  height: 320px;
  overflow: scroll;
`;

export const DndText = styled.div`
  font-size: 14px;
  color: ${themes.Color.grayScale[60]};
  font-weight: 600;
  margin-left: 2px;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 360px;
  background-color: white;
  padding-top: 40px;
  margin-left: 30px;
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
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  color: ${({ isSelect }) => (isSelect ? themes.Color.primary[20] : "#A5A5A5")};
  font-weight: 500;
  border: 1.5px solid
    ${({ isSelect }) =>
      isSelect ? themes.Color.primary[20] : themes.Color.grayScale[50]};
  border-radius: 8px;
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
