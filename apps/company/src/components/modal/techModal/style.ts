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
  margin: 60px 0 20px 0;
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
  overflow: scroll;
  min-height: 70px;
  gap: 5px;
  padding-left: 10px;
  width: 600px;
  align-items: center;
`;

export const SmallCard = styled.button`
  border: none;
  padding: 5px 10px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  height: 25px;
  display: flex;
  align-items: center;
  margin-right: 7px;
  font-size: 14px;
  font-weight: 400;
  color: ${themes.Color.grayScale[90]};
  outline: none;
  white-space: nowrap;
  cursor: default;
`;

export const XCardText = styled.div`
  margin-left: 7px;
  margin-top: -1px;
  cursor: pointer;
  color: red;
  font-size: 16px;
`;

export const SearchIcon = styled(Image)`
  position: absolute;
  top: 0;
  right: 61px;
`;

export const SearchInput = styled.input`
  background-color: ${themes.Color.grayScale[30]};
  border: 0.5px solid #f7f7f7;
  width: 250px;
  height: 40px;
  outline: none;
  padding: 10px 50px 10px 20px;
`;

export const BigCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
  height: 300px;
  width: 600px;
  margin-bottom: 20px;
  overflow: scroll;
`;

export const BigCard = styled.button<{ colorBool: boolean }>`
  border: none;
  width: 114px;
  height: 76px;
  background-color: ${props => (props.colorBool ? "#0F4C82" : "white")};
  color: ${props => (props.colorBool ? "white" : "black")};
  font-weight: 350;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &:hover {
    background-color: ${props =>
      !props.colorBool && themes.Color.grayScale[40]};
    color: ${props => (props.colorBool ? "white" : "black")};
  }
  cursor: pointer;
`;

export const AddText = styled.div`
  position: absolute;
  background-color: ${themes.Color.grayScale[30]};
  color: ${themes.Color.grayScale[50]};
  height: 40px;
  width: 250px;
  text-align: left;
  padding: 10px 50px 10px 20px;
  border-radius: 0 0 30px 30px;
  cursor: pointer;
`;
