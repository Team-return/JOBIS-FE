import { themes } from "@jobis/design-token";
import { styled } from "styled-components";
import { Icon } from "@jobis/ui";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0 20px;
  border-radius: 10px;

  background-color: white;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 580px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const SmallCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 600px;
  padding: 10px 0;
  padding-left: 10px;
  overflow-x: scroll;
  min-height: 40px;
  gap: 5px;

  ::-webkit-scrollbar-thumb {
    background-color: ${themes.Color.grayScale[60]};
  }

  ::-webkit-scrollbar-track {
    background-color: ${themes.Color.grayScale[40]};
  }
`;

export const SmallCard = styled.button`
  display: flex;
  align-items: center;
  height: 25px;
  margin-right: 7px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;

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

export const SearchIcon = styled(Icon)`
  position: absolute;
  top: 7px;
  right: 15px;
`;

export const ContentsText = styled.div`
  margin-top: 8px;

  color: #7f7f7f;
  font-size: 14px;
  font-weight: 400;
`;

export const SearchInput = styled.input`
  width: 250px;
  height: 40px;
  padding: 10px 50px 10px 20px;
  border: 0.5px solid #f7f7f7;
  border-radius: 30px;

  background: #eaeaea;
  outline: none;
`;

export const MaxSize = styled.div`
  height: 300px;
`;

export const BigCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 600px;
  margin-bottom: 20px;
  padding: 5px;

  overflow: scroll;
  gap: 5px;
  max-height: 300px;
`;

export const BigCard = styled.button<{ colorBool: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 76px;
  padding: 3px;
  border: none;
  border-radius: 5px;

  background-color: ${props => (props.colorBool ? "#0F4C82" : "white")};

  color: ${props => (props.colorBool ? "white" : "black")};
  font-size: 14px;
  font-weight: 350;
  box-shadow: 0 0 1px 1px rgb(0 0 0 / 25%);
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      !props.colorBool && themes.Color.grayScale[40]};

    color: ${props => (props.colorBool ? "white" : "black")};
  }
`;

export const Btn = styled.button`
  width: 92px;
  height: 40px;
  margin-top: 20px;
  border: 1px solid #0f4c82;
  border-radius: 3px;

  background-color: white;

  color: #0f4c82;
  cursor: pointer;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 750;
  text-align: start;
`;
