import { useAddCode, useGetCode } from "@/hooks/apis/useCodeApi";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ICode } from "@/apis/codes/types";
import { useModal } from "@/hooks/useModal";
import { useTechState } from "@/store/techState";
import { themes } from "@jobis/design-token";
import { Text, Button, Flex, Input, Textarea, Icon, useToast } from "@jobis/ui";
import { useAreaState } from "@/store/areasState";
import { IArea } from "@/apis/recruitments/types";
import * as S from "./style";
import { useAddedJob, useAddedTech } from "@/store/addCodeState";

const jobType = ["WEB", "APP", "GAME", "EMBEDDED", "SECURITY", "AI", "ASD"];

interface IPropsType {
  setForm: Dispatch<SetStateAction<IArea[]>>;
  areaIndex: number | null;
  setAreaIndex: Dispatch<SetStateAction<number | null>>;
}

const GatherModal = ({ setForm, areaIndex, setAreaIndex }: IPropsType) => {
  const { data: jobs } = useGetCode("JOB");
  const { closeModal } = useModal();
  const { mutateAsync: addCode } = useAddCode();
  const [isAddJob, setIsAddJob] = useState(false);
  const { addedJob, appendAddedJob, setAddedJob } = useAddedJob();
  const { addedTechList, deleteAddedTechList } = useAddedTech();
  const [addJobInput, setAddJobInput] = useState("");

  const { area, setArea, resetArea } = useAreaState();
  const { toast } = useToast();

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
    deleteAddedTechList(id);
    setArea({
      ...area,
      tech_codes: area.tech_codes.filter(techCode => techCode !== id),
    });
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

  useEffect(() => {
    if (jobs) {
      setAddedJob(
        addedJob.filter(job => !jobs.codes.some(code => code.code === job.code))
      );
    }
  }, [jobs, setAddedJob]);

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
                            colorBool={area.job_codes?.includes(code.code)}
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
        <Flex>
          <S.FieldTitle style={{ width: 113, textAlign: "right" }}>
            기타
          </S.FieldTitle>
          <S.Field>
            <Flex gap={8} wrap="wrap" style={{ width: 500 }}>
              {jobs?.codes
                .filter(code => code.job_type === "ETC")
                .map(code => {
                  const techTech = {
                    code: code.code,
                    keyword: code.keyword,
                  };
                  return (
                    <S.JobCard
                      type="button"
                      key={code.code}
                      colorBool={area.job_codes.includes(code.code)}
                      onClick={() => checkArray(techTech)}
                    >
                      {code.keyword}
                    </S.JobCard>
                  );
                })}
              {addedJob?.map(code => {
                const tech = {
                  code: code.code,
                  keyword: code.keyword,
                };
                return (
                  <S.JobCard
                    type="button"
                    key={code.code}
                    colorBool={area.job_codes.includes(code.code)}
                    onClick={() => checkArray(tech)}
                  >
                    {code.keyword}
                  </S.JobCard>
                );
              })}
              {isAddJob ? (
                <Input
                  placeholder="추가하기"
                  icon={
                    <Icon
                      icon="Close"
                      onClick={() => setIsAddJob(false)}
                      cursor="pointer"
                    />
                  }
                  onChange={e => {
                    setAddJobInput(e.target.value);
                  }}
                  onKeyDown={async e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (
                        jobs?.codes.some(code => code.keyword === addJobInput)
                      ) {
                        setIsAddJob(false);
                        pushArray(
                          jobs?.codes.find(
                            code => code.keyword === addJobInput
                          ) as ICode
                        );
                        return;
                      } else {
                        const response = await addCode({
                          job_type: "ETC",
                          code_type: "JOB",
                          keyword: addJobInput,
                        });
                        setIsAddJob(false);
                        appendAddedJob({
                          code: response.code_id,
                          keyword: addJobInput,
                        });
                        pushArray({
                          job_type: "ETC",
                          code: response.code_id,
                          keyword: addJobInput,
                        });
                        setAddJobInput("");
                      }
                    }
                  }}
                />
              ) : (
                <Flex
                  align="center"
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsAddJob(true)}
                >
                  <Icon icon="Plus" size={20} />
                </Flex>
              )}
            </Flex>
          </S.Field>
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
              <S.Card type="button" key={res?.code}>
                {res?.keyword}
                <S.XText onClick={() => deleteTech(res.code)}>x</S.XText>
              </S.Card>
            );
          })}
          {addedTechList.map(res => {
            return (
              <S.Card type="button" key={res?.code}>
                {res?.keyword}
                <S.XText onClick={() => deleteTech(res.code)}>x</S.XText>
              </S.Card>
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
            max={255}
            value={area.hiring == 0 ? "" : area.hiring}
            onInput={e => {
              const value = Number(e.currentTarget.value);
              if (value < 0) {
                e.currentTarget.value = "0";
              } else if (value > 255) {
                e.currentTarget.value = "255";
              }
            }}
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
          <Textarea
            placeholder="직접입력"
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
          <Textarea
            placeholder="직접입력"
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
            if (area.job_codes.length <= 0) {
              toast({
                payload: {
                  type: "error",
                  message: "채용 직무를 선택해주세요",
                },
              });
            } else if (area.major_task.length <= 0) {
              toast({
                payload: {
                  type: "error",
                  message: "상세 직무를 입력해주세요",
                },
              });
            } else {
              areaIndex == null
                ? setForm(prev => [...prev, area])
                : setForm(prev =>
                    prev.map((areas, idx) => (idx === areaIndex ? area : areas))
                  );
              resetState();
              setAreaIndex(null);
            }
          }}
        >
          확인
        </Button>
      </Flex>
    </S.Container>
  );
};

export default GatherModal;
