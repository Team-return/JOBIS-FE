import Image from "next/image";
import { styled } from "styled-components";
import { themes } from "@jobis/design-token";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 48vh;
  margin: 60px 0 20px;
  border-radius: 10px;

  background-color: white;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 580px;
`;

export const SmallCardWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
  padding-left: 10px;

  overflow: scroll;
  min-height: 70px;
  gap: 5px;
`;

export const SmallCard = styled.button`
  display: flex;
  align-items: center;
  height: 25px;
  margin-right: 7px;
  padding: 5px 10px;
  border: none;
  border-radius: 15px;

  background: #fff;
  outline: none;

  color: ${themes.Color.grayScale[90]};
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  box-shadow: 0 0 4px rgb(0 0 0 / 25%);
  cursor: default;
`;

export const XCardText = styled.div`
  margin-top: -1px;
  margin-left: 7px;

  color: red;
  font-size: 16px;
  cursor: pointer;
`;

export const SearchIcon = styled(Image)`
  position: absolute;
  top: 0;
  right: 61px;
`;

export const SearchInput = styled.input`
  width: 250px;
  height: 40px;
  padding: 10px 50px 10px 20px;
  border: 0.5px solid #f7f7f7;

  background-color: ${themes.Color.grayScale[30]};
  outline: none;
`;

export const BigCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 600px;
  height: 300px;
  margin-bottom: 20px;

  overflow: scroll;
  gap: 3px;
`;

export const BigCard = styled.button<{ colorBool: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 76px;
  border: none;
  border-radius: 5px;

  background-color: ${props => (props.colorBool ? "#0F4C82" : "white")};

  color: ${props => (props.colorBool ? "white" : "black")};
  font-size: 16px;
  font-weight: 350;
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      !props.colorBool && themes.Color.grayScale[40]};

    color: ${props => (props.colorBool ? "white" : "black")};
  }
`;

export const AddText = styled.div`
  position: absolute;
  width: 250px;
  height: 40px;
  padding: 10px 50px 10px 20px;
  border-radius: 0 0 30px 30px;

  background-color: ${themes.Color.grayScale[30]};

  color: ${themes.Color.grayScale[50]};
  text-align: left;
  cursor: pointer;
`;
