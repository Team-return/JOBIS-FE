"use client";

import { TitleTemplate } from "@/components/titleTemplate";
import { SubTitleTemplate } from "@/components/subTitleTemplate";
import * as S from "./style";
import { InputTemplate } from "@/components/inputTemplate";
import { Input, Icon, Text, Flex, Button } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ICompanyRegisterRequest } from "@/apis/company/types";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Address } from "react-daum-postcode";
import DaumPostcode from "react-daum-postcode";
import Modal from "@/components/modal";
import { regex } from "@/utils/regex";
import UploadImage from "../../../public/imageUpload.svg";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useFileUpload } from "@/hooks/apis/useFilesApi";
import { IFileResponse } from "@/apis/files/types";
import { useCompanyRegister } from "@/hooks/apis/useCompanyApi";
import { useGetCode } from "@/hooks/apis/useCodeApi";

export default function Registration() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ICompanyRegisterRequest>();

  const [companyLogoPreview, setCompanyLogoPreview] = useState("");
  const [previewFiles, setPreviewFiles] = useState<{
    bizRegistrationFile: File[];
    attachmentFile: File[];
  }>({ bizRegistrationFile: [], attachmentFile: [] });

  const companyLogoRef = useRef<HTMLInputElement>(null);
  const bizRegistrationRef = useRef<HTMLInputElement>(null);
  const attachmentRef = useRef<HTMLInputElement>(null);
  const { mutate: fileUpload } = useFileUpload();

  const { closeModal, openModal, modalState } = useModal();

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      if (files.length === 0) {
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          setCompanyLogoPreview(reader.result as string);
        };
        uploadImgFile(e);
      }
    }
  };

  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    const { name, files, multiple } = e.target;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        formData.append("file", files[i]);
      }

      if (name === "biz_registration_url") {
        setPreviewFiles(prev => ({
          ...prev,
          bizRegistrationFile: Array.from(files || []),
        }));
      }
      if (name === "attachment_urls") {
        setPreviewFiles(prev => ({
          ...prev,
          attachmentFile: Array.from(files || []),
        }));
      }

      fileUpload(formData, {
        onSuccess: (res: IFileResponse) => {
          multiple
            ? setValue(name as keyof ICompanyRegisterRequest, res.urls)
            : setValue(name as keyof ICompanyRegisterRequest, res.urls[0]);
        },
      });
    }
  };

  const { data: businessCodes } = useGetCode("BUSINESS_AREA");
  const businessAreas = businessCodes?.codes.map(item => item.keyword) ?? [];
  const { mutate: registerCompany } = useCompanyRegister();

  const onSubmit: SubmitHandler<ICompanyRegisterRequest> = data => {
    const {
      sub_manager_phone_no,
      sub_manager_name,
      manager_phone_no,
      sub_address_detail,
      sub_zip_code,
      take,
      worker_number,
      business_area_code,
      business_number,
    } = data;
    registerCompany({
      ...data,
      business_number: business_number.replaceAll("-", ""),
      manager_phone_no: manager_phone_no?.replaceAll("-", ""),
      sub_zip_code: sub_zip_code || undefined,
      sub_address_detail: sub_address_detail || undefined,
      sub_manager_name: sub_manager_name || undefined,
      sub_manager_phone_no:
        sub_manager_phone_no?.replaceAll("-", "") || undefined,
      take: +take.toString().replaceAll("-", ""),
      worker_number: +worker_number,
      business_area_code:
        businessCodes?.codes.find(
          code => code.keyword === business_area_code.toString()
        )?.code || 0,
    });
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  const selectAddress = (data: Address) => {
    if (modalState === "MAIN_ADDRESS") {
      setValue("main_address", data?.address);
      setValue("main_zip_code", data?.zonecode);
    } else if (modalState === "SUB_ADDRESS") {
      setValue("sub_address", data?.address);
      setValue("sub_zip_code", data?.zonecode);
    }
    closeModal();
  };

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

  const onUploadFile = useCallback((ref: RefObject<HTMLInputElement>) => {
    if (!ref.current) {
      return;
    }
    ref.current.click();
  }, []);

  useEffect(() => {
    if (!!searchParams.get("name") && !!searchParams.get("business-number")) {
      setValue("name", decodeURI(searchParams.get("name") || ""));
      setValue(
        "business_number",
        decodeURI(searchParams.get("business-number") || "")
      );
    } else {
      router.push("/");
    }
  }, [searchParams, router, setValue]);

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <TitleTemplate
        title="기업 정보 등록"
        subTitle={
          "등록된 정보는 본 시스템을 통해 접수된 건에 한하여 정식적으로 검토되며,\n등록된 정보는 서비스 이용에 활용됩니다."
        }
      />
      <SubTitleTemplate
        title="기업 정보"
        components={[
          <InputTemplate title="기업명" required>
            <Input
              width={604}
              disabled
              {...register("name", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.name?.message}
            />
          </InputTemplate>,
          <InputTemplate title="사업자번호" required>
            <Input
              width={604}
              disabled
              maxLength={12}
              {...register("business_number", {
                required: "필수 입력 항목입니다.",
                pattern: {
                  value: /^\d{3}-\d{2}-\d{5}$/,
                  message:
                    "유효한 사업자번호 형식이 아닙니다. (ex: xxx-xx-xxxx)",
                },
              })}
              errorMessage={errors.business_number?.message}
            />
          </InputTemplate>,
          <InputTemplate title="대표자" required>
            <Input
              width={604}
              placeholder="직접입력"
              {...register("representative_name", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.representative_name?.message}
            />
          </InputTemplate>,
          <InputTemplate title="설립일" required>
            <Controller
              control={control}
              name="founded_at"
              rules={{
                required: "필수 입력 항목입니다.",
                pattern: {
                  value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                  message: "유효한 날짜 형식이 아닙니다.",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  width={604}
                  placeholder="yyyy-mm-dd"
                  maxLength={10}
                  onChange={e =>
                    field.onChange(regex.date_number(e.target.value))
                  }
                  icon={<Icon icon="Date" size={20} />}
                  errorMessage={errors.founded_at?.message}
                />
              )}
            />
          </InputTemplate>,
          <InputTemplate title="주소(본사)" required>
            <Flex direction="column" gap={8}>
              <Flex gap={8}>
                <Input
                  width={355}
                  disabled
                  {...register("main_address", {
                    required: "필수 입력 항목입니다.",
                  })}
                  errorMessage={errors.main_address?.message}
                />
                <Input
                  width={111}
                  disabled
                  {...register("main_zip_code", {
                    required: "필수 입력 항목입니다.",
                  })}
                  errorMessage={errors.main_zip_code?.message}
                />
                <Flex direction="column" style={{ width: "100%" }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openModal("MAIN_ADDRESS")}
                  >
                    검색
                  </Button>
                </Flex>
              </Flex>
              <Input
                width={604}
                placeholder="상세주소 입력"
                {...register("main_address_detail", {
                  required: "필수 입력 항목입니다.",
                })}
                errorMessage={errors.main_address_detail?.message}
              />
            </Flex>
          </InputTemplate>,
          <InputTemplate title="주소(지점)">
            <Flex direction="column" gap={8}>
              <Flex gap={8}>
                <Input
                  width={355}
                  disabled
                  {...register("sub_address")}
                  errorMessage={errors.sub_address?.message}
                />
                <Input
                  width={111}
                  disabled
                  {...register("sub_zip_code")}
                  errorMessage={errors.sub_zip_code?.message}
                />
                <Flex direction="column" style={{ width: "100%" }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => openModal("SUB_ADDRESS")}
                  >
                    검색
                  </Button>
                </Flex>
              </Flex>
              <Input
                width={604}
                placeholder="상세주소 입력"
                {...register("sub_address_detail")}
                errorMessage={errors.sub_address_detail?.message}
              />
            </Flex>
          </InputTemplate>,
          <InputTemplate title="매출액(년)" required>
            <Controller
              control={control}
              name="take"
              rules={{ required: "필수 입력 항목입니다." }}
              render={({ field }) => (
                <Input
                  {...field}
                  width={604}
                  placeholder="직접입력"
                  maxLength={30}
                  errorMessage={errors.take?.message}
                  onChange={e => field.onChange(regex.money(e.target.value))}
                  icon={
                    <Text
                      fontSize="body2"
                      fontWeight="regular"
                      color={themes.Color.grayScale[60]}
                    >
                      억/년
                    </Text>
                  }
                />
              )}
            ></Controller>
          </InputTemplate>,
          <InputTemplate title="총 근로자수(명)" required>
            <Input
              width={604}
              placeholder="직접입력"
              {...register("worker_number", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.worker_number?.message}
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
          </InputTemplate>,
          <InputTemplate title="사업분야" required>
            <Flex direction="column" gap={4}>
              <S.Select
                isError={!!errors.business_area_code}
                {...register("business_area_code", {
                  required: "필수 선택 항목입니다.",
                })}
              >
                <S.Option value="" disabled selected>
                  선택 안함
                </S.Option>
                {businessAreas.map(area => (
                  <S.Option>{area}</S.Option>
                ))}
              </S.Select>
              <Text
                fontSize="body3"
                fontWeight="regular"
                color={themes.Color.subColor.red[20]}
              >
                {errors.business_area_code?.message}
              </Text>
            </Flex>
          </InputTemplate>,
        ]}
      />
      <SubTitleTemplate
        title="담당자"
        components={[
          <InputTemplate title="담당자명(1)" required>
            <Input
              width={604}
              placeholder="직접입력"
              {...register("manager_name", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.manager_name?.message}
            />
          </InputTemplate>,
          <InputTemplate title="담장자 전화번호(1)" required>
            <Controller
              control={control}
              name="manager_phone_no"
              rules={{
                required: "필수 입력 항목입니다.",
                pattern: {
                  value: /^\d{2,3}-\d{3,4}-\d{4}$/,
                  message: "유효한 전화번호 형식이 아닙니다.",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="tel"
                  width={604}
                  placeholder="nnn-nnnn-nnnn"
                  maxLength={13}
                  onChange={e =>
                    field.onChange(regex.phone_number(e.target.value))
                  }
                  errorMessage={errors.manager_phone_no?.message}
                />
              )}
            />
          </InputTemplate>,
          <InputTemplate title="담당자명(2)">
            <Input
              width={604}
              placeholder="직접입력"
              {...register("sub_manager_name")}
              errorMessage={errors.sub_manager_name?.message}
            />
          </InputTemplate>,
          <InputTemplate title="담장자 전화번호(2)">
            <Controller
              control={control}
              name="sub_manager_phone_no"
              rules={{
                pattern: {
                  value: /^\d{2,3}-\d{3,4}-\d{4}$/,
                  message: "유효한 전화번호 형식이 아닙니다.",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="tel"
                  width={604}
                  placeholder="nnn-nnnn-nnnn"
                  maxLength={13}
                  onChange={e =>
                    field.onChange(regex.phone_number(e.target.value))
                  }
                  errorMessage={errors.sub_manager_phone_no?.message}
                />
              )}
            />
          </InputTemplate>,
          <InputTemplate title="이메일" required>
            <Input
              type="email"
              width={604}
              placeholder="직접입력"
              {...register("email", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.email?.message}
            />
          </InputTemplate>,
          <InputTemplate title="팩스번호">
            <Controller
              control={control}
              name="fax"
              rules={{
                pattern: {
                  value: /^\d{2,3}-\d{3,4}-\d{4}$/,
                  message: "유효한 팩스번호 형식이 아닙니다.",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  width={604}
                  maxLength={13}
                  placeholder="nnn-nnn-nnnn"
                  onChange={e =>
                    field.onChange(regex.phone_number(e.target.value))
                  }
                  errorMessage={errors.fax?.message}
                />
              )}
            />
          </InputTemplate>,
        ]}
      />
      <SubTitleTemplate
        title="회사소개"
        components={[
          <InputTemplate title="대표서비스명" required>
            <Input
              width={604}
              placeholder="직접입력"
              {...register("service_name", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.service_name?.message}
            />
          </InputTemplate>,
          <InputTemplate title="회사개요" required>
            <Input
              width={604}
              placeholder="직접입력"
              {...register("company_introduce", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.company_introduce?.message}
            />
          </InputTemplate>,
          <InputTemplate title="회사로고">
            {companyLogoPreview ? (
              <S.LogoImage
                onClick={() => onUploadFile(companyLogoRef)}
                src={companyLogoPreview}
                width={184}
                height={184}
                alt=""
              />
            ) : (
              <S.ImageUpload onClick={() => onUploadFile(companyLogoRef)}>
                <Image src={UploadImage} width={40} height={40} alt="" />
              </S.ImageUpload>
            )}
            <Input
              type="file"
              name="company_profile_url"
              style={{ display: "none" }}
              ref={companyLogoRef}
              onChange={saveImgFile}
            />
          </InputTemplate>,
          <InputTemplate title="사업자등록증">
            <Flex direction="column">
              <S.AddFileButton onClick={() => onUploadFile(bizRegistrationRef)}>
                <Text fontSize="body2" fontWeight="regular">
                  파일 추가하기
                </Text>
                <Icon icon="Plus" color={themes.Color.primary[20]} />
              </S.AddFileButton>
              <Input
                name="biz_registration_url"
                type="file"
                style={{ display: "none" }}
                ref={bizRegistrationRef}
                onChange={uploadImgFile}
              />
              {previewFiles.bizRegistrationFile.map(file => (
                <Text fontSize="body2" color={themes.Color.grayScale[50]}>
                  {file.name}-{(file.size / 1024).toFixed(2)}KB
                </Text>
              ))}
            </Flex>
          </InputTemplate>,
          <InputTemplate title="파일첨부">
            <Flex direction="column">
              <S.AddFileButton onClick={() => onUploadFile(attachmentRef)}>
                <Text fontSize="body2" fontWeight="regular">
                  파일 추가하기
                </Text>
                <Icon icon="Plus" color={themes.Color.primary[20]} />
              </S.AddFileButton>
              <Input
                name="attachment_urls"
                type="file"
                style={{ display: "none" }}
                onChange={uploadImgFile}
                ref={attachmentRef}
                multiple
              />
              {previewFiles.attachmentFile.map(file => (
                <Text fontSize="body2" color={themes.Color.grayScale[50]}>
                  {file.name}-{(file.size / 1024).toFixed(2)}KB
                </Text>
              ))}
            </Flex>
          </InputTemplate>,
        ]}
      />
      <Flex justify="flex-end" gap={12} style={{ width: 850 }}>
        <Link href={"/"}>
          <Button type="reset" variant="outline">
            취소
          </Button>
        </Link>
        <Button type="submit">확인</Button>
      </Flex>
      {(modalState === "MAIN_ADDRESS" || modalState === "SUB_ADDRESS") && (
        <Modal width={400} onClose={closeModal}>
          <DaumPostcode onComplete={selectAddress}></DaumPostcode>
        </Modal>
      )}
    </S.Container>
  );
}
