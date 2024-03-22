import { themes } from "@jobis/design-token";
import Image from "next/image";
import { styled } from "styled-components";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: ${themes.Color.grayScale[20]};
  gap: 16px;
  padding: 120px 0;
`;

export const ProcessButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: ${themes.Font.body2.fontSize};
  line-height: ${themes.Font.body2.lineHeight};
  font-weight: ${themes.FontWeight.regular};
  width: 604px;
  color: ${themes.Color.primary[20]};
  border-radius: 8px;
  border: 1px solid ${themes.Color.primary[20]};
  cursor: pointer;
`;

export const Boxs = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 10px;
`;

export const CancelButton = styled.div`
  padding: 12px 40px;
  border-radius: 3px;
  border: 1.5px solid #0f4c82;
  border-radius: 8px;
  color: #0f4c82;
  ${themes.Font.body2};
  cursor: pointer;
`;

export const FieldBoxTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  width: 400px;
`;

export const GatherFieldBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 100px;
  overflow: hidden;
  padding: 20px 30px;
  background: #fdfdfd;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
`;

export const XText = styled.div`
  margin-left: 7px;
  margin-top: -1px;
  cursor: pointer;
  color: red;
`;

export const FieldText = styled.div`
  font-size: 14px;
  width: 400px;
  margin-top: 8px;
  color: #555555;
  white-space: pre-wrap;
`;

export const PeopleCount = styled.div`
  position: absolute;
  top: 35px;
  right: 45px;
  font-size: 30px;
  font-weight: 700;
`;

export const CancelIcon = styled(Image)`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

export const LicenseList = styled.ul`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  overflow: scroll;
  width: 604px;
  align-items: center;
  padding: 5px;
  margin: 5px;
`;

export const SelectedLicense = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border: 1px solid ${themes.Color.primary[20]};
  border-radius: 16px;
`;
