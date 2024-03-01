import { useGetCode } from "@/hooks/apis/useCodeApi";
import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { ICode } from "@/apis/codes/types";
import { useModal } from "@/hooks/useModal";
import { useTechState } from "@/store/techState";
import { themes } from "@jobis/design-token";
import { Text, Button, Flex, Input } from "@jobis/ui";
import { useAreaState } from "@/store/areasState";
import { IArea } from "@/apis/recruitments/types";
import * as S from "./style";

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
    (area.job_codes.includes(tech.code) ? true : false)
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
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, []);

  const resetState = () => {
    closeModal();
    resetArea();
    resetTechList();
  };

  return (
    <S.Container>
      <S.BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          채용직무<span style={{ color: "#0087FF" }}> *</span>
        </Text>
        <S.ContentsText>
          아래 제시된 분야중 해당하는 분야를 선택하세요.
        </S.ContentsText>
        <Flex align="center">
          <S.FieldTitleWrapper>
            <S.FieldTitle>웹프로그래밍</S.FieldTitle>
            <S.FieldTitle>모바일</S.FieldTitle>
            <S.FieldTitle>게임</S.FieldTitle>
            <S.FieldTitle>임베디드</S.FieldTitle>
            <S.FieldTitle>보안</S.FieldTitle>
            <S.FieldTitle>인공지능</S.FieldTitle>
            <S.FieldTitle>응용프로그래밍</S.FieldTitle>
          </S.FieldTitleWrapper>
          <div>
            {jobType.map((type, idx) => {
              return (
                <S.FieldWrapper key={idx}>
                  <S.Field>
                    {jobs?.codes
                      .filter(code => code.job_type === type)
                      .map(code => {
                        const techTech = {
                          code: code.code,
                          keyword: code.keyword,
                        };
                        return (
                          <S.JobCard
                            type="button"
                            key={code.code}
                            colorBool={
                              area.job_codes.includes(code.code) ? true : false
                            }
                            onClick={() => checkArray(techTech)}
                          >
                            {code.keyword}
                          </S.JobCard>
                        );
                      })}
                  </S.Field>
                </S.FieldWrapper>
              );
            })}
          </div>
        </Flex>
      </S.BigWrapper>
      <S.BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          사용기술
        </Text>
        <S.ContentsText>필요한 기술 스택을 추가하세요.</S.ContentsText>
        <S.CardWrapper>
          {techList.map(res => {
            return (
              <>
                <S.Card key={res.code}>
                  {res.keyword}
                  <S.XText onClick={() => deleteTech(res.code)}>x</S.XText>
                </S.Card>
              </>
            );
          })}
          <S.AddTechButton onClick={() => openModal("USE_TECH")}>
            + 추가
          </S.AddTechButton>
        </S.CardWrapper>
      </S.BigWrapper>
      <S.BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          채용인원<span style={{ color: "#0087FF" }}> *</span>
        </Text>
        <S.ContentsText>채용할 인원을 입력해주세요.</S.ContentsText>
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
      </S.BigWrapper>
      <S.BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          상세직무<span style={{ color: "#0087FF" }}> *</span>
        </Text>
        <S.ContentsText>
          해당 직무에서 하는 일을 상세하게 입력해주세요.
        </S.ContentsText>
        <Flex align="center">
          <S.Textarea
            ref={textRef}
            value={area.major_task}
            onInput={handleResizeHeight}
            onChange={e => setArea({ ...area, major_task: e.target.value })}
          />
        </Flex>
      </S.BigWrapper>
      <S.BigWrapper>
        <Text fontSize="h5" fontWeight="bold" align="left">
          우대사항
        </Text>
        <S.ContentsText>우대사항을 입력해주세요</S.ContentsText>
        <Flex align="center">
          <S.Textarea
            ref={textRef}
            value={area.preferential_treatment}
            onInput={handleResizeHeight}
            onChange={e =>
              setArea({ ...area, preferential_treatment: e.target.value })
            }
          />
        </Flex>
      </S.BigWrapper>
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
    </S.Container>
  );
};

export default GatherModal;
