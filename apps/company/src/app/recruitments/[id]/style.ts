import { themes } from "@jobis/design-token";
import Image from "next/image";
import { styled } from "styled-components";

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 120px 0;

  background-color: ${themes.Color.grayScale[20]};
  gap: 16px;
`;

export const ProcessButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 604px;
  padding: 12px;
  border: 1px solid ${themes.Color.primary[20]};
  border-radius: 8px;

  color: ${themes.Color.primary[20]};
  font-size: ${themes.Font.body2.fontSize};
  font-weight: ${themes.FontWeight.regular};
  line-height: ${themes.Font.body2.lineHeight};
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
  border: 1.5px solid #0f4c82;
  border-radius: 8px;

  color: #0f4c82;
  ${themes.Font.body2};
  cursor: pointer;
`;

export const FieldBoxTitle = styled.div`
  width: 400px;

  font-size: 16px;
  font-weight: 500;
`;

export const GatherFieldBox = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 30px;

  background: #fdfdfd;
  overflow: hidden;
  min-height: 100px;
  box-shadow: 0 0 8px rgb(0 0 0 / 15%);
`;

export const XText = styled.div`
  margin-top: -1px;
  margin-left: 7px;

  color: red;
  cursor: pointer;
`;

export const FieldText = styled.div`
  width: 400px;
  margin-top: 8px;

  color: #555;
  font-size: 14px;
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
  flex-wrap: wrap;
  width: 604px;
  margin: 5px;
  padding: 5px;

  overflow: scroll;
  gap: 8px;
`;

export const SelectedLicense = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border: 1px solid ${themes.Color.primary[20]};
  border-radius: 16px;
`;
