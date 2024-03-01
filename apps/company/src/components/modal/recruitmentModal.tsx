import styled from "styled-components";
import { useGetCode } from "@/hooks/apis/useCodeApi";
import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { ICode } from "@/apis/codes/types";
import { useModal } from "@/hooks/useModal";
import { useTechState } from "@/store/techState";
import { themes } from "@jobis/design-token";
import { Text, Button, Flex, Input } from "@jobis/ui";
import { IRecruitment } from "@/apis/recruitments/types";
import { useAreaState } from "@/store/areasState";

const jobType = ["WEB", "APP", "GAME", "EMBEDDED", "SECURITY", "AI", "ASD"];

interface IPropsType {
  setForm: Dispatch<SetStateAction<IArea[]>>;
}

const GatherModal = ({ setForm }: IPropsType) => {
  const { data: jobs } = useGetCode("JOB");
  const { closeModal } = useModal();

  const { area, setArea, resetArea } = useAreaState();

  const { techList, deleteTechList, resetTechList } = useTechState();
  const { openModal } = useModal();

  const pushArray = (tech: ICode) => {
    setArea({ ...area, job_codes: [...area.job_codes, tech.code] });
  };

  const deleteArray = (code: number) => {
    setArea({
      ...area,
      job_codes: area.job_codes.filter(datas => datas !== code),
    });
  };

  const checkArray = (tech: ICode) => {
    (area.job_codes.filter(datas => datas === tech.code).length ? true : false)
      ? deleteArray(tech.code)
      : pushArray(tech);
  };

  const deleteTech = (id: number) => {
    deleteTechList(id);
  };

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, []);

  const resetState = () => {
    closeModal();
    resetArea();
    resetTechList();
  };

  return (
    <Container>
      <BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          채용직무<span style={{ color: "#0087FF" }}> *</span>
        </Text>
        <ContentsText>
          아래 제시된 분야중 해당하는 분야를 선택하세요.
        </ContentsText>
        <Flex align="center">
          <FieldTitleWrapper>
            <FieldTitle>웹프로그래밍</FieldTitle>
            <FieldTitle>모바일</FieldTitle>
            <FieldTitle>게임</FieldTitle>
            <FieldTitle>임베디드</FieldTitle>
            <FieldTitle>보안</FieldTitle>
            <FieldTitle>인공지능</FieldTitle>
            <FieldTitle>응용프로그래밍</FieldTitle>
          </FieldTitleWrapper>
          <div>
            {jobType.map((type, idx) => {
              return (
                <FieldWrapper key={idx}>
                  <Field>
                    {jobs?.codes
                      .filter(code => code.job_type === type)
                      .map((code, idx) => {
                        const techTech = {
                          code: code.code,
                          keyword: code.keyword,
                        };
                        return (
                          <JobCard
                            key={idx}
                            colorBool={
                              area.job_codes.filter(
                                datas => datas === code.code
                              ).length
                                ? true
                                : false
                            }
                            onClick={() => checkArray(techTech)}
                          >
                            {code.keyword}
                          </JobCard>
                        );
                      })}
                  </Field>
                </FieldWrapper>
              );
            })}
          </div>
        </Flex>
      </BigWrapper>
      <BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          사용기술
        </Text>
        <ContentsText>필요한 기술 스택을 추가하세요.</ContentsText>
        <CardWrapper>
          {techList.map((res, idx) => {
            return (
              <>
                <Card key={idx}>
                  {res.keyword}
                  <XText onClick={() => deleteTech(res.code)}>x</XText>
                </Card>
              </>
            );
          })}
          <AddTechButton onClick={() => openModal("USE_TECH")}>
            + 추가
          </AddTechButton>
        </CardWrapper>
      </BigWrapper>
      <BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          채용인원<span style={{ color: "#0087FF" }}> *</span>
        </Text>
        <ContentsText>채용할 인원을 입력해주세요.</ContentsText>
        <Flex align="center">
          <Input
            type="number"
            min={0}
            value={area.hiring}
            onChange={e => {
              setArea({ ...area, hiring: +e.target.value });
            }}
            icon={
              <Text
                fontSize="body2"
                fontWeight="regular"
                color={themes.Color.grayScale[60]}
              >
                명
              </Text>
            }
          />
        </Flex>
      </BigWrapper>
      <BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          상세직무<span style={{ color: "#0087FF" }}> *</span>
        </Text>
        <ContentsText>
          해당 직무에서 하는 일을 상세하게 입력해주세요.
        </ContentsText>
        <Flex align="center">
          <Textarea
            ref={textRef}
            value={area.major_task}
            onInput={handleResizeHeight}
            onChange={e => setArea({ ...area, major_task: e.target.value })}
          />
        </Flex>
      </BigWrapper>
      <BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          우대사항
        </Text>
        <ContentsText>우대사항을 입력해주세요</ContentsText>
        <Flex align="center">
          <Textarea
            ref={textRef}
            value={area.preferential_treatment}
            onInput={handleResizeHeight}
            onChange={e =>
              setArea({ ...area, preferential_treatment: e.target.value })
            }
          />
        </Flex>
      </BigWrapper>
      <Flex justify="center" gap={15}>
        <Button variant="outline" onClick={resetState}>
          취소
        </Button>
        <Button
          type="button"
          onClick={() => {
            setForm(prev => [...prev, area]);
            resetState();
          }}
        >
          확인
        </Button>
      </Flex>
    </Container>
  );
};

export default GatherModal;

const Container = styled.form`
  border: 3px solid white;
  width: 800px;
  padding: 50px;
  height: 80vh;
  overflow: scroll;
  border-radius: 10px;
  background-color: white;
`;

const BigWrapper = styled.div`
  margin-bottom: 80px;
`;

const CardWrapper = styled.div`
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

const Card = styled.button`
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

const AddTechButton = styled(Card)`
  color: ${themes.Color.grayScale[60]};
  cursor: pointer;
`;

const XText = styled.div`
  margin-left: 7px;
  margin-top: -1px;
  cursor: pointer;
  color: red;
`;

const Field = styled.div`
  margin-left: 40px;
`;

const FieldTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 19px;
`;

const FieldTitle = styled.h3`
  height: 39px;
  margin: 15px 0px;
`;

const Textarea = styled.textarea`
  border: none;
  border: 1px solid ${themes.Color.grayScale[50]};
  border-radius: 8px;
  width: 100%;
  min-height: 80px;
  padding: 10px;
  outline: none;
  /* resize: none; */
`;

const JobCard = styled.button<{ colorBool: boolean }>`
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

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
`;

const ContentsText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #7f7f7f;
  margin-top: 6px;
  margin-bottom: 20px;
  text-align: left;
`;
