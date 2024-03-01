import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const Container = styled.form`
  border: 3px solid white;
  width: 800px;
  padding: 50px;
  height: 80vh;
  overflow: scroll;
  border-radius: 10px;
  background-color: white;
`;

export const BigWrapper = styled.div`
  margin-bottom: 80px;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  overflow: scroll;
  width: 490px;
  align-items: center;
  margin-left: 30px;
  padding: 5px;
  margin-top: 15px;
`;

export const Card = styled.button`
  border: none;
  padding: 5px 10px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  height: 25px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: ${themes.Color.grayScale[90]};
  outline: none;
  white-space: nowrap;
  cursor: default;
`;

export const AddTechButton = styled(Card)`
  color: ${themes.Color.grayScale[60]};
  cursor: pointer;
`;

export const XText = styled.div`
  margin-left: 7px;
  margin-top: -1px;
  cursor: pointer;
  color: red;
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
  margin: 15px 0px;
`;

export const Textarea = styled.textarea`
  border: none;
  border: 1px solid ${themes.Color.grayScale[50]};
  border-radius: 8px;
  width: 100%;
  min-height: 80px;
  padding: 10px;
  outline: none;
  /* resize: none; */
`;

export const JobCard = styled.button<{ colorBool: boolean }>`
  height: 39px;
  padding: 0px 20px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-right: 10px;
  border: none;
  background-color: ${props => (props.colorBool ? "#0F4C82" : "white")};
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${props => (props.colorBool ? "white" : "black")};
  cursor: pointer;
`;

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
`;

export const ContentsText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #7f7f7f;
  margin-top: 6px;
  margin-bottom: 20px;
  text-align: left;
`;
