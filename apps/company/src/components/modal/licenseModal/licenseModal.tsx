import { useModal } from "@/hooks/useModal";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import * as S from "./style";
import { useGetRequiredLicensesList } from "@/apis/openai";

interface PropsType {
  requiredLicensesArray: string[];
  setForm: Dispatch<SetStateAction<string[]>>;
}

const LicenseModal = ({ setForm, requiredLicensesArray }: PropsType) => {
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

  const checkArray = (requiredLicenseName: string) => {
    licenses.includes(requiredLicenseName)
      ? setLicenses(prev =>
          prev.filter(
            requiredLicense => requiredLicense !== requiredLicenseName
          )
        )
      : setLicenses(prev => [...prev, requiredLicenseName]);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLicenses(requiredLicensesArray);
  }, [requiredLicensesArray]);

  return (
    <S.Container>
      <S.TitleWrapper>
        <div>
          <S.Title>국가자격증 선택</S.Title>
          <S.ContentsText>
            해당 직무에 필요한 국가자격증을 선택하세요.
          </S.ContentsText>
        </div>
        <S.InputWrapper>
          <S.SearchInput type="text" value={search} onChange={onChange} />
          <S.SearchIcon icon="Search" />
        </S.InputWrapper>
      </S.TitleWrapper>
      <S.SmallCardWrapper>
        {licenses.map((license, idx) => {
          return (
            <S.SmallCard key={idx}>
              {license}
              <S.XCardText onClick={() => checkArray(license)}>x</S.XCardText>
            </S.SmallCard>
          );
        })}
      </S.SmallCardWrapper>
      <S.MaxSize>
        <S.BigCardWrapper>
          {requiredLicensesFilteringData
            ?.filter(datas => datas.includes(search))
            .map((license, idx) => {
              return (
                <S.BigCard
                  key={idx}
                  colorBool={licenses.includes(license)}
                  onClick={() => {
                    checkArray(license);
                  }}
                >
                  {license}
                </S.BigCard>
              );
            })}
        </S.BigCardWrapper>
      </S.MaxSize>
      <S.Btn
        onClick={() => {
          setForm(licenses);
          closeModal();
        }}
      >
        완료
      </S.Btn>
    </S.Container>
  );
};

export default LicenseModal;
