import { ChangeEvent, useState } from "react";
import { useGetCode } from "@/hooks/apis/useCodeApi";
import { ICode } from "@/apis/codes/types";
import { useModal } from "@/hooks/useModal";
import { useTechState } from "@/store/techState";
import SearchBtn from "../../../../public/Search_btn.svg";
import { useAreaState } from "@/store/areasState";
import * as S from "./style";
import { Text, Button } from "@jobis/ui";
import { themes } from "@jobis/design-token";

const TechModal = () => {
  const { data: techs } = useGetCode("TECH");
  const { techList, appendTechList, deleteTechList } = useTechState();
  const { area, setArea } = useAreaState();
  const [search, setSearch] = useState("");

  const { openModal } = useModal();

  const checkArray = (tech: ICode) => {
    (techList.filter(datas => datas.code === tech.code).length ? true : false)
      ? deleteArray(tech.code)
      : pushArray(tech);
  };

  const deleteArray = (code: number) => {
    deleteTechList(code);
  };

  const pushArray = (tech: ICode) => {
    appendTechList(tech);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <S.Container>
        <S.TitleWrapper>
          <div>
            <Text fontSize="h6" fontWeight="bold" align="start">
              사용기술 선택
            </Text>
            <Text
              fontSize="body3"
              fontWeight="regular"
              color={themes.Color.grayScale[60]}
            >
              해당 직무에 필요한 기술을 선택하세요.
            </Text>
          </div>
          <div>
            <S.SearchInput type="text" value={search} onChange={onChange} />
            <S.SearchIcon
              src={SearchBtn}
              width={40}
              height={40}
              alt=""
              unoptimized
            />
          </div>
        </S.TitleWrapper>
        <S.SmallCardWrapper>
          {techList.map((res, idx) => {
            return (
              <>
                <S.SmallCard key={idx}>
                  {res.keyword}
                  <S.XCardText onClick={() => deleteArray(res.code)}>
                    x
                  </S.XCardText>
                </S.SmallCard>
              </>
            );
          })}
        </S.SmallCardWrapper>
        <S.BigCardWrapper>
          {techs?.codes
            .filter(datas => {
              return datas.keyword.toLowerCase().includes(search.toLowerCase());
            })
            .map((res, idx) => {
              const tech = {
                code: res.code,
                keyword: res.keyword,
              };
              return (
                <>
                  <S.BigCard
                    key={idx}
                    colorBool={
                      !!techList.filter(datas => datas.code === res.code).length
                    }
                    onClick={() => {
                      checkArray(tech);
                    }}
                  >
                    {res.keyword}
                  </S.BigCard>
                </>
              );
            })}
        </S.BigCardWrapper>
      </S.Container>
      <Button
        variant="outline"
        onClick={() => {
          setArea({ ...area, tech_codes: techList.map(tech => tech.code) });
          openModal("GATHER_FIELD");
        }}
        style={{ margin: "0 auto 55px auto" }}
      >
        완료
      </Button>
    </>
  );
};

export default TechModal;
