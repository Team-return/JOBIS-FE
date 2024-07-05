import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Container = styled.form`
  width: 800px;
  height: 80vh;
  padding: 50px;
  border: 3px solid white;
  border-radius: 10px;

  background-color: white;
  overflow: scroll;
`;

export const BigWrapper = styled.div`
  margin-bottom: 80px;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 490px;
  margin-top: 15px;
  margin-left: 30px;
  padding: 5px;

  overflow: scroll;
  gap: 5px;
`;

export const Card = styled.button`
  display: flex;
  align-items: center;
  height: 25px;
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

export const AddTechButton = styled(Card)`
  color: ${themes.Color.grayScale[60]};
  cursor: pointer;
`;

export const XText = styled.div`
  margin-top: -1px;
  margin-left: 7px;

  color: red;
  cursor: pointer;
`;

export const Field = styled.div`
  margin-left: 40px;
`;

export const FieldTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 19px;
`;

export const FieldTitle = styled.h3`
  height: 39px;
  margin: 15px 0;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: none;
  border: 1px solid ${themes.Color.grayScale[50]};
  border-radius: 8px;

  outline: none;
  min-height: 80px;

  /* resize: none; */
`;

export const JobCard = styled.button<{ colorBool: boolean }>`
  height: 39px;
  margin-right: 10px;
  padding: 0 20px;
  border: none;
  border-radius: 5px;

  background-color: ${props => (props.colorBool ? "#0F4C82" : "white")};

  color: ${props => (props.colorBool ? "white" : "black")};
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  box-shadow: 0 0 8px rgb(0 0 0 / 25%);
  cursor: pointer;
`;

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
`;

export const ContentsText = styled.div`
  margin-top: 6px;
  margin-bottom: 20px;

  color: #7f7f7f;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
`;
