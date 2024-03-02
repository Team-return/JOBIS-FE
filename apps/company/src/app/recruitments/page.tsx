"use client";

import * as S from "./style";
import { TitleTemplate } from "@/components/titleTemplate";
import { SubTitleTemplate } from "@/components/subTitleTemplate";
import { InputTemplate } from "@/components/inputTemplate";
import { Text, Input, Icon, Flex, Checkbox, Button } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  IArea,
  IHiringProgress,
  IRecruitment,
} from "@/apis/recruitments/types";
import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/modal";
import ProgressModal from "@/components/modal/progressModal/progressModal";
import { regex } from "@/utils/regex";
import { useSearchParams } from "next/navigation";
import GatherModal from "@/components/modal/recruitmentModal/recruitmentModal";
import { useAreaState } from "@/store/areasState";
import { useGetCode } from "@/hooks/apis/useCodeApi";
import XBtn from "../../../public/X.svg";
import TechModal from "@/components/modal/techModal/techModal";
import { hiringProgressType } from "@/utils/translate";
import LicenseModal from "@/components/modal/licenseModal/licenseModal";
import { useCreateRecruitmentRequest } from "@/hooks/apis/useRecruitmentsApi";

export default function Recruitments() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    control,
  } = useForm<IRecruitment>();

  const [alwaysRecruit, setAlwaysRecruit] = useState(false);
  const searchParams = useSearchParams();

  const { modalState, closeModal, openModal } = useModal();

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; //Chrome에서 동작하도록; deprecated
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  useEffect(() => {
    if (alwaysRecruit) {
      setValue("start_date", undefined);
      setValue("end_date", undefined);
    }
  }, [alwaysRecruit, setValue]);

  useEffect(() => {
    if (searchParams.get("winter")) {
      setValue("winter_intern", true);
    } else {
      setValue("winter_intern", false);
    }
  }, [searchParams, setValue]);

  const [hiringProgress, setHiringProgress] = useState<IHiringProgress[]>([]);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [submitDocumentOption, setSubmitDocumentOption] = useState({
    self_introduction: false,
    resume: false,
    portfolio: false,
  });
  const [licenses, setLicenses] = useState<string[]>([]);

  const { resetArea } = useAreaState();

  useEffect(() => {
    setValue("hiring_progress", hiringProgress);
  }, [watch, hiringProgress, setValue]);

  useEffect(() => {
    setValue("areas", areas);
  }, [watch, areas, setValue]);

  useEffect(() => {
    setValue("required_licenses", licenses);
  }, [licenses, setValue]);

  const changeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSubmitDocumentOption(prev => ({ ...prev, [name]: !checked }));
  };

  const { data: techName } = useGetCode("TECH");
  const { data: jobName } = useGetCode("JOB");
  const { mutate } = useCreateRecruitmentRequest(
    searchParams.get("company-id") || ""
  );

  const onSubmit: SubmitHandler<IRecruitment> = data => {
    const { pay, train_pay, submit_document, benefits, required_grade, etc } =
      data;
    const document = [];
    if (submit_document) {
      document.push(submit_document);
    }
    if (!submitDocumentOption.portfolio) {
      document.push("포트폴리오");
    }
    if (!submitDocumentOption.resume) {
      document.push("이력서");
    }
    if (!submitDocumentOption.self_introduction) {
      document.push("자기소개서");
    }
    mutate({
      ...data,
      submit_document: document.join(", "),
      pay: pay?.replaceAll(",", "") || undefined,
      train_pay: train_pay.replaceAll(",", ""),
      benefits: benefits || undefined,
      required_grade: required_grade || undefined,
      etc: etc || undefined,
    });
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <TitleTemplate
        title="모집의뢰서 등록"
        subTitle={
          "등록된 정보는 본 시스템을 통해 접수된 건에 한하여\n정식적으로 검토되며, 등록된 정보는 서비스 이용에 활용됩니다."
        }
      />
      <SubTitleTemplate
        title="모집 년도"
        requiredMessage
        components={[
          <InputTemplate title="모집기간" required>
            <Flex direction="column" gap={8}>
              <Flex align="center" gap={22}>
                <Controller
                  control={control}
                  name="start_date"
                  rules={{
                    required: {
                      value: !alwaysRecruit,
                      message: "필수 입력 항목입니다.",
                    },
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message: "유효한 날짜 형식이 아닙니다. (ex: yyyy-mm-dd)",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      width={272}
                      placeholder="yyyy-mm-dd"
                      disabled={alwaysRecruit}
                      maxLength={10}
                      icon={
                        <Icon
                          icon="Date"
                          color={themes.Color.grayScale[80]}
                          size={20}
                          cursor="pointer"
                        />
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.onChange(regex.date_number(e.target.value))
                      }
                      errorMessage={errors.start_date?.message}
                    />
                  )}
                />
                <Text fontSize="h5" color={themes.Color.grayScale[60]}>
                  ~
                </Text>
                <Controller
                  control={control}
                  name="end_date"
                  rules={{
                    required: {
                      value: !alwaysRecruit,
                      message: "필수 입력 항목입니다.",
                    },
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message: "유효한 날짜 형식이 아닙니다. (ex: yyyy-mm-dd)",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      width={272}
                      placeholder="yyyy-mm-dd"
                      disabled={alwaysRecruit}
                      maxLength={10}
                      icon={
                        <Icon
                          icon="Date"
                          color={themes.Color.grayScale[80]}
                          size={20}
                          cursor="pointer"
                        />
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        field.onChange(regex.date_number(e.target.value))
                      }
                      errorMessage={errors.end_date?.message}
                    />
                  )}
                />
              </Flex>
              <Checkbox
                checked={alwaysRecruit}
                onClick={() => setAlwaysRecruit(prev => !prev)}
              >
                상시채용
              </Checkbox>
            </Flex>
          </InputTemplate>,
          <InputTemplate title="기타사항">
            <Input
              width={604}
              placeholder="직접입력"
              {...register("etc")}
              errorMessage={errors.etc?.message}
            />
          </InputTemplate>,
        ]}
      />
      <SubTitleTemplate
        title="모집 분야"
        components={[
          <InputTemplate title="모집 분야 추가" required>
            <Flex direction="column" gap={8} style={{ width: 604 }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => openModal("GATHER_FIELD")}
              >
                추가
              </Button>
              {areas.length > 0 && (
                <S.Boxs>
                  {areas.map((area, idx) => {
                    const {
                      job_codes,
                      tech_codes,
                      hiring,
                      major_task,
                      preferential_treatment,
                    } = area;
                    return (
                      <S.GatherFieldBox key={idx}>
                        <S.FieldBoxTitle>
                          분야:{" "}
                          {jobName?.codes
                            .filter(code => job_codes.includes(code?.code))
                            .map(code => code.keyword)
                            .join(" / ")}
                        </S.FieldBoxTitle>
                        <S.FieldText>
                          사용기술 :{" "}
                          {techName?.codes.map(
                            code =>
                              tech_codes.includes(code?.code) &&
                              `${code?.keyword} `
                          ) || "없음"}
                        </S.FieldText>
                        <S.FieldText style={{ top: 70 }}>
                          주요 업무 : {major_task || "없음"}
                        </S.FieldText>
                        <S.FieldText style={{ top: 70 }}>
                          우대사항 : {preferential_treatment || "없음"}
                        </S.FieldText>
                        <S.PeopleCount>{hiring}명</S.PeopleCount>
                        <S.CancelIcon
                          width={10}
                          height={10}
                          onClick={() =>
                            setAreas(areas.filter((_, idx2) => idx2 !== idx))
                          }
                          src={XBtn}
                          alt=""
                        />
                      </S.GatherFieldBox>
                    );
                  })}
                </S.Boxs>
              )}
            </Flex>
          </InputTemplate>,
        ]}
      />
      <SubTitleTemplate
        title="자격 요건"
        components={[
          <InputTemplate title="국가자격증">
            <Flex direction="column" gap={8} style={{ width: 604 }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => openModal("LICENSE")}
              >
                추가
              </Button>
              <S.LicenseList>
                {licenses.map((license, idx) => (
                  <S.SelectedLicense>
                    <Text
                      fontSize="body3"
                      fontWeight="regular"
                      whiteSpace="no-wrap"
                    >
                      {license}
                    </Text>
                    <Icon
                      icon="Close"
                      size={16}
                      onClick={() =>
                        setLicenses(licenses.filter((_, idx2) => idx !== idx2))
                      }
                      cursor="center"
                    />
                  </S.SelectedLicense>
                ))}
              </S.LicenseList>
            </Flex>
          </InputTemplate>,
          <InputTemplate title="성적">
            <Flex direction="column" gap={8}>
              <Input
                width={604}
                placeholder="직접입력"
                maxLength={3}
                max={100}
                {...register("required_grade", {
                  max: {
                    value: 100,
                    message: "최대 100까지 입력할 수 있어요.",
                  },
                })}
                icon={
                  <Text
                    fontSize="body2"
                    fontWeight="regular"
                    color={themes.Color.grayScale[60]}
                  >
                    %이내
                  </Text>
                }
                errorMessage={errors.required_grade?.message}
              />
            </Flex>
          </InputTemplate>,
        ]}
      />
      <SubTitleTemplate
        title="근무 조건"
        components={[
          <InputTemplate title="근무시간" required>
            <Flex align="center" gap={22}>
              <Controller
                control={control}
                name="start_time"
                rules={{
                  required: "필수 입력 항목입니다.",
                  pattern: {
                    value: /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
                    message: "유효한 시간 형식이 아닙니다. (ex: hh:mm)",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    width={272}
                    maxLength={5}
                    placeholder="hh:mm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(regex.time(e.target.value))
                    }
                    errorMessage={errors.start_time?.message}
                  />
                )}
              />
              <Text fontSize="h5" color={themes.Color.grayScale[60]}>
                ~
              </Text>
              <Controller
                control={control}
                name="end_time"
                rules={{
                  required: "필수 입력 항목입니다.",
                  pattern: {
                    value: /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
                    message: "유효한 시간 형식이 아닙니다. (ex: hh:mm)",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    width={272}
                    maxLength={5}
                    placeholder="hh:mm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(regex.time(e.target.value))
                    }
                    errorMessage={errors.end_time?.message}
                  />
                )}
              />
            </Flex>
          </InputTemplate>,
          <InputTemplate title="실습수당" required>
            <Controller
              control={control}
              name="train_pay"
              rules={{ required: "필수 입력 항목입니다." }}
              render={({ field }) => (
                <Input
                  {...field}
                  width={604}
                  placeholder="직접입력"
                  maxLength={30}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(regex.money(e.target.value))
                  }
                  icon={
                    <Text
                      fontSize="body2"
                      fontWeight="regular"
                      color={themes.Color.grayScale[60]}
                    >
                      만원/월
                    </Text>
                  }
                  errorMessage={errors.train_pay?.message}
                />
              )}
            />
          </InputTemplate>,
          <InputTemplate title="정규직 전환 시">
            <Controller
              control={control}
              name="pay"
              render={({ field }) => (
                <Input
                  {...field}
                  width={604}
                  placeholder="직접입력"
                  maxLength={30}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(regex.money(e.target.value))
                  }
                  errorMessage={errors.pay?.message}
                  icon={
                    <Text
                      fontSize="body2"
                      fontWeight="regular"
                      color={themes.Color.grayScale[60]}
                    >
                      만원/년
                    </Text>
                  }
                />
              )}
            />
          </InputTemplate>,
          <InputTemplate title="복리후생">
            <Flex direction="column" gap={8}>
              <Input
                width={604}
                placeholder="직접입력"
                {...register("benefits")}
                errorMessage={errors.benefits?.message}
              />
              <Checkbox checked={watch("military")} {...register("military")}>
                병역특례 신청
              </Checkbox>
            </Flex>
          </InputTemplate>,
        ]}
      />
      <SubTitleTemplate
        title="채용 절차"
        components={[
          <InputTemplate title="채용절차" required>
            <Flex direction="column" gap={10}>
              <S.ProcessButton onClick={() => openModal("HIRING_PROGRESS")}>
                <Text fontSize="body2" fontWeight="regular">
                  절차 추가하기
                </Text>
                <Icon icon="Plus" color={themes.Color.primary[20]} />
              </S.ProcessButton>
              <Text
                fontSize="body2"
                color={themes.Color.grayScale[50]}
                whiteSpace="pre-wrap"
                style={{ width: 604 }}
              >
                {watch("hiring_progress")
                  ?.map(progress => hiringProgressType[progress])
                  .join(" → ")}
              </Text>
            </Flex>
          </InputTemplate>,
          <InputTemplate title="제출서류" required>
            <Flex direction="column" gap={8}>
              <Input
                width={604}
                placeholder="직접입력"
                {...register("submit_document")}
                errorMessage={errors.submit_document?.message}
              />
              <Flex gap={20}>
                <Checkbox
                  name="self_introduction"
                  checked={!submitDocumentOption.self_introduction}
                  onChange={changeCheckbox}
                >
                  자기소개서
                </Checkbox>
                <Checkbox
                  name="resume"
                  checked={!submitDocumentOption.resume}
                  onChange={changeCheckbox}
                >
                  이력서
                </Checkbox>
                <Checkbox
                  name="portfolio"
                  checked={!submitDocumentOption.portfolio}
                  onChange={changeCheckbox}
                >
                  포트폴리오
                </Checkbox>
              </Flex>
            </Flex>
          </InputTemplate>,
        ]}
      />
      <Flex justify="flex-end" gap={12} style={{ width: 850 }}>
        <Button type="reset" variant="outline">
          취소
        </Button>
        <Button type="submit">확인</Button>
      </Flex>
      {modalState === "HIRING_PROGRESS" && (
        <Modal width={810} onClose={closeModal} closeAble>
          <ProgressModal
            hiringProgressArray={hiringProgress}
            setRecruitmentFormDetailInfo={setHiringProgress}
          />
        </Modal>
      )}
      {modalState === "GATHER_FIELD" && (
        <Modal
          width={800}
          onClose={() => {
            closeModal();
            resetArea();
          }}
          closeAble
        >
          <GatherModal setForm={setAreas} />
        </Modal>
      )}
      {modalState === "LICENSE" && (
        <Modal width={700} onClose={closeModal}>
          <LicenseModal
            requiredLicensesArray={licenses}
            setForm={setLicenses}
          />
        </Modal>
      )}
      {modalState === "USE_TECH" && (
        <Modal width={700} onClose={() => openModal("GATHER_FIELD")} closeAble>
          <TechModal />
        </Modal>
      )}
    </S.Container>
  );
}
