import styled from "styled-components";
import { useGetCode } from "@/hooks/apis/useCodeApi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ICode } from "@/apis/codes/types";
import { useModal } from "@/hooks/useModal";
import { CheckBox, HStack, Icon, Stack, Text, VStack, theme } from "@team-return/design-system";
import { IEditRecruitmentRequest } from "@/apis/recruitments/types";
import { useAreaState } from "@/store/areasState";
import { useAddRecruitArea, useMyRecruitment } from "@/hooks/apis/useRecruitmentsApi";
import OutsideClickHandler from "react-outside-click-handler";

const jobType = ["WEB", "APP", "GAME", "EMBEDDED", "SECURITY", "AI", "ASD"];

interface IPropsType {
  recruitment_id: number;
  setForm: Dispatch<SetStateAction<IEditRecruitmentRequest>>;
}

const AddRecruitAreaModal = ({ recruitment_id, setForm }: IPropsType) => {
  const { data: jobs } = useGetCode("JOB");
  const { data: tech_list } = useGetCode("TECH");
  const { closeModal } = useModal();

  const { area, setArea, resetArea } = useAreaState();

  const { data: myRecruitment } = useMyRecruitment();
  const { mutate } = useAddRecruitArea({ ...area }, recruitment_id);

  const [searchText, setSearchText] = useState<string>("");
  const [inputFoucs, setInputFocus] = useState(false);

  useEffect(() => {
    if (myRecruitment) {
      setArea({
        id: area.id,
        tech_codes: area.tech_codes,
        hiring: area.hiring,
        major_task: area.major_task,
        job_codes: area.job_codes,
        preferential_treatment: area.preferential_treatment,
      });
    }
  }, [
    myRecruitment,
    area.id,
    area.hiring,
    area.job_codes,
    area.major_task,
    area.tech_codes,
    area.preferential_treatment,
    setArea,
  ]);

  const PushArray = (tech: ICode) => {
    setArea({ ...area, job_codes: [...area.job_codes, tech.code] });
  };

  const DeleteArray = (code: number) => {
    setArea({ ...area, job_codes: area.job_codes.filter((datas) => datas !== code) });
  };

  const CheckArray = (tech: ICode) => {
    area?.job_codes?.filter((datas) => datas === tech.code).length ? DeleteArray(tech.code) : PushArray(tech);
  };

  const searchTechsArray = tech_list?.codes
    .filter((techItem) => techItem.keyword.toLowerCase().includes(searchText.toLowerCase()))
    .filter((tech) => tech.code);

  return (
    <>
      <Container>
        <Text size="Heading5" color="liteBlue" align="start">
          채용직무
        </Text>
        <Stack align="center" margin={["bottom", 70]}>
          <FieldTitleWrapper>
            <FieldTitle>웹프로그래밍</FieldTitle>
            <FieldTitle>모바일</FieldTitle>
            <FieldTitle>게임</FieldTitle>
            <FieldTitle>임베디드</FieldTitle>
            <FieldTitle>보안</FieldTitle>
            <FieldTitle>인공지능</FieldTitle>
            <FieldTitle>응용프로그래밍</FieldTitle>
          </FieldTitleWrapper>
          <VStack gap={30}>
            {jobType.map((type, idx) => {
              return (
                <FieldWrapper key={idx}>
                  <Field>
                    {jobs?.codes
                      .filter((code) => code.job_type === type)
                      .map((code, idx) => {
                        const techTech = {
                          code: code.code,
                          keyword: code.keyword,
                        };
                        return (
                          <CheckBox
                            key={idx}
                            checked={!!area?.job_codes?.filter((datas) => datas === code.code).length}
                            onClick={() => CheckArray(techTech)}
                          >
                            {code.keyword}
                          </CheckBox>
                        );
                      })}
                  </Field>
                </FieldWrapper>
              );
            })}
          </VStack>
        </Stack>
        <BigWrapper>
          <HStack justify="space-between" align="start">
            <Text size="Heading5" color="liteBlue" align="start" margin={["bottom", 20]}>
              사용기술
            </Text>
            <OutsideClickHandler onOutsideClick={() => setInputFocus(false)}>
              <TechWrapper>
                <TechInput
                  placeholder="기술 이름 검색"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setInputFocus(true)}
                />
                <SearchIconWrapper>
                  <Icon icon="Search" size={20} />
                </SearchIconWrapper>
                {inputFoucs && (
                  <SearchTechWrapper>
                    {searchTechsArray?.length ? (
                      tech_list?.codes
                        .filter((techItem) => techItem.keyword.toLowerCase().includes(searchText.toLowerCase()))
                        .filter((techItem) => !area.tech_codes?.includes(techItem.code))
                        .map((techItem, idx) => {
                          return (
                            <SearchTechCard
                              key={idx}
                              onClick={() =>
                                setArea({
                                  ...area,
                                  tech_codes: [...area.tech_codes, techItem.code],
                                })
                              }
                            >
                              {techItem.keyword}
                            </SearchTechCard>
                          );
                        })
                    ) : (
                      <SearchTechCard
                        style={{
                          fontSize: "15px",
                          color: `${theme.color.gray60}`,
                          fontWeight: "400",
                        }}
                      >
                        검색결과가 없습니다.
                      </SearchTechCard>
                    )}
                  </SearchTechWrapper>
                )}
              </TechWrapper>
            </OutsideClickHandler>
          </HStack>
          <CardWrapper>
            {area.tech_codes.map((res, i) => {
              return (
                <Card key={i}>
                  {tech_list?.codes.find((tech) => tech.code == res)?.keyword}
                  <XIcon>
                    <Icon
                      icon="Close"
                      size={15}
                      color="gray10"
                      onClick={() => {
                        setArea({ ...area, tech_codes: area.tech_codes.filter((tech) => tech !== res) });
                      }}
                    />
                  </XIcon>
                </Card>
              );
            })}
          </CardWrapper>
        </BigWrapper>
        <BigWrapper>
          <Text size="Heading5" color="liteBlue" align="start" margin={["bottom", 16]}>
            채용인원
          </Text>
          <HStack>
            <UnitInputWrapper>
              <Input
                name="hiring"
                min={0}
                type="number"
                value={area.hiring}
                onChange={(e) => setArea({ ...area, hiring: parseInt(e.target.value) })}
              />
              <Unit>명</Unit>
            </UnitInputWrapper>
          </HStack>
        </BigWrapper>
        <BigWrapper>
          <Text size="Heading5" color="liteBlue" align="start" margin={["bottom", 16]}>
            주요 업무
          </Text>
          <TextArea
            name="major_task"
            value={area.major_task}
            onChange={(e) => setArea({ ...area, major_task: e.target.value })}
          />
        </BigWrapper>
        <BigWrapper>
          <Text size="Heading5" color="liteBlue" align="start" margin={["bottom", 16]}>
            우대 사항
          </Text>
          <TextArea
            name="preferential_treatment"
            value={area.preferential_treatment}
            onChange={(e) => setArea({ ...area, preferential_treatment: e.target.value })}
          />
        </BigWrapper>
        <BtnWrapper>
          <CancelBtn
            onClick={() => {
              closeModal();
              resetArea();
            }}
          >
            취소
          </CancelBtn>
          <SuccessBtn
            onClick={() => {
              mutate();
              setForm((prev) => ({ ...prev, areas: [area] }));
              resetArea();
              closeModal();
            }}
          >
            확인
          </SuccessBtn>
        </BtnWrapper>
      </Container>
    </>
  );
};

export default AddRecruitAreaModal;

const Container = styled.div`
  width: 700px;
  padding: 50px;
  height: 80vh;
  overflow: scroll;
  border-radius: 2px;
  background-color: white;
`;

const BigWrapper = styled.div`
  margin-bottom: 80px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  height: 39px;
  margin-left: 40px;
`;

const FieldTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 19px;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 14px;
`;

const FieldTitle = styled.h3`
  height: 39px;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  margin: 15px 0px;
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SuccessBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${theme.color.liteBlue};
  padding: 20px;
  height: 40px;
  width: auto;
  font-size: 18px;
  font-weight: 400;
  color: ${theme.color.gray10};
  cursor: pointer;
`;

const CancelBtn = styled(SuccessBtn)`
  color: ${theme.color.gray60};
  background-color: ${theme.color.gray10};
  border: 1px solid ${theme.color.gray50};
`;

const Unit = styled.div`
  position: absolute;
  right: 15px;
  font-size: 18px;
  font-weight: 400;
  color: ${theme.color.gray60};
`;

const UnitInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: default;
`;

const Input = styled.input<{ disabled?: boolean }>`
  width: 100%;
  height: 45px;
  padding: 10px 15px;
  border: 0;
  outline: 0;
  margin-left: auto;
  border: 1px solid #cccccc;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 400;
  &::placeholder {
    color: #7f7f7f;
  }
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "auto")};
  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 90px;
  border: 0;
  outline: 0;
  border: 1px solid #cccccc;
  border-radius: 2px;
  font-size: 18px;
  font-weight: 400;
  padding: 10px 15px;
  &::placeholder {
    color: #7f7f7f;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 12px;
`;

const TechInput = styled.input<{ marginTop?: number }>`
  width: 180px;
  height: 45px;
  font-size: 15px;
  padding: 10px 42px 10px 15px;
  outline: none;
  border-radius: 2px;
  border: 1px solid ${theme.color.gray50};
  background: ${theme.color.gray20};
  margin-top: ${({ marginTop }) => marginTop + "px"};
`;

const TechWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchTechWrapper = styled.div`
  position: absolute;
  width: 180px;
  border: 1px solid ${theme.color.gray50};
  background-color: white;
  display: flex;
  flex-direction: column;
  max-height: 130px;
  right: 0;
  top: 45px;
  white-space: nowrap;
  overflow: scroll;
  z-index: 2;
`;

const SearchTechCard = styled.div`
  width: 100%;
  padding: 15px;
  background-color: white;
  font-size: 17px;
  cursor: pointer;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: scroll;
  width: 100%;
  min-height: 50px;
  padding: 10px 12px;
  margin-top: 15px;
  border: 1px solid ${theme.color.gray50};
  border-radius: 3px;
  background-color: ${theme.color.gray20};
`;

const Card = styled.button`
  color: black;
  border: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  padding: 17px;
  background: ${theme.color.gray10};
  border-radius: 2px;
  height: 25px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  outline: none;
  white-space: nowrap;
  position: relative;
  cursor: default;
`;

const XIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border: 1px solid black;
  background-color: black;
  border-radius: 50%;
  margin-left: 7px;
  margin-top: -1px;
  cursor: pointer;
  position: absolute;
  right: -3px;
  top: -3px;
`;
