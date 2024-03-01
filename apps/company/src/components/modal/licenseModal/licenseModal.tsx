import {
  IEditRecruitmentRequest,
  IRecruitment,
} from "@/apis/recruitments/types";
import { useModal } from "@/hooks/useModal";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Icon } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import styled from "styled-components";
import { useGetRequiredLicensesList } from "@/apis/openai";

interface PropsType<T> {
  requiredLicensesArray: string[];
  setForm: Dispatch<SetStateAction<string[]>>;
}

const LicenseModal = <T extends IRecruitment | IEditRecruitmentRequest>({
  setForm,
  requiredLicensesArray,
}: PropsType<T>) => {
  const { closeModal } = useModal();
  const [search, setSearch] = useState("");
  const [licenses, setLicenses] = useState<string[]>([]);
  const { data: requiredLicenses } = useGetRequiredLicensesList(1, 1972);
  const requiredLicensesNames = requiredLicenses?.data.map(
    requiredLicense => requiredLicense.종목명
  );
  const requiredLicensesFilteringData = requiredLicensesNames?.filter(
    (requiredLicense, i) =>
      requiredLicensesNames?.indexOf(requiredLicense) === i
  );

  const CheckArray = (requiredLicenseName: string) => {
    !licenses.includes(requiredLicenseName)
      ? setLicenses(prev => [...prev, requiredLicenseName])
      : setLicenses(prev =>
          prev.filter(
            requiredLicense => requiredLicense !== requiredLicenseName
          )
        );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLicenses(requiredLicensesArray);
  }, []);

  return (
    <Container>
      <TitleWrapper>
        <div>
          <Title>국가자격증 선택</Title>
          <ContentsText>
            해당 직무에 필요한 국가자격증을 선택하세요.
          </ContentsText>
        </div>
        <InputWrapper>
          <SearchInput type="text" value={search} onChange={onChange} />
          <SearchIcon icon="Search" />
        </InputWrapper>
      </TitleWrapper>
      <SmallCardWrapper>
        {licenses.map((license, idx) => {
          return (
            <SmallCard key={idx}>
              {license}
              <XCardText onClick={() => CheckArray(license)}>x</XCardText>
            </SmallCard>
          );
        })}
      </SmallCardWrapper>
      <MaxSize>
        <BigCardWrapper>
          {requiredLicensesFilteringData
            ?.filter(datas => datas.includes(search))
            .map((license, idx) => {
              return (
                <BigCard
                  key={idx}
                  colorBool={licenses.includes(license)}
                  onClick={() => {
                    CheckArray(license);
                  }}
                >
                  {license}
                </BigCard>
              );
            })}
        </BigCardWrapper>
      </MaxSize>
      <Btn
        onClick={() => {
          setForm(licenses);
          closeModal();
        }}
      >
        완료
      </Btn>
    </Container>
  );
};

export default LicenseModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 0 20px 0;
  border-radius: 10px;
  background-color: white;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 580px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const SmallCardWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  min-height: 40px;
  gap: 5px;
  flex-wrap: wrap;
  padding: 10px 0;
  padding-left: 10px;
  width: 600px;
  align-items: center;
  ::-webkit-scrollbar-thumb {
    background-color: ${themes.Color.grayScale[60]};
  }
  ::-webkit-scrollbar-track {
    background-color: ${themes.Color.grayScale[40]};
  }
`;

const SmallCard = styled.button`
  border: none;
  padding: 5px 10px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
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

const XCardText = styled.div`
  margin-left: 7px;
  margin-top: -1px;
  cursor: pointer;
  color: red;
  font-size: 16px;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 7px;
  right: 15px;
`;

const ContentsText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #7f7f7f;
  margin-top: 8px;
`;

const SearchInput = styled.input`
  background: #eaeaea;
  border: 0.5px solid #f7f7f7;
  border-radius: 30px;
  width: 250px;
  height: 40px;
  outline: none;
  padding: 10px 50px 10px 20px;
`;

const MaxSize = styled.div`
  height: 300px;
`;

const BigCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 5px;
  gap: 5px;
  max-height: 300px;
  width: 600px;
  margin-bottom: 20px;
  overflow: scroll;
`;

const BigCard = styled.button<{ colorBool: boolean }>`
  border: none;
  width: 114px;
  height: 76px;
  background-color: ${props => (props.colorBool ? "#0F4C82" : "white")};
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  color: ${props => (props.colorBool ? "white" : "black")};
  font-weight: 350;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 3px;
  &:hover {
    background-color: ${props =>
      !props.colorBool && themes.Color.grayScale[40]};
    color: ${props => (props.colorBool ? "white" : "black")};
  }
  cursor: pointer;
`;

const Btn = styled.button`
  width: 92px;
  height: 40px;
  border: 1px solid #0f4c82;
  border-radius: 3px;
  background-color: white;
  color: #0f4c82;
  cursor: pointer;
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 750;
  text-align: start;
`;
