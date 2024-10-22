"use client";

import { TitleTemplate } from "@/components/titleTemplate";
import { SubTitleTemplate } from "@/components/subTitleTemplate";
import * as S from "./style";
import { InputTemplate } from "@/components/inputTemplate";
import { Input, Icon, Text, Flex, Button, useToast, Textarea } from "@jobis/ui";
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
import { useCreatePresignedURL } from "@/hooks/apis/useFilesApi";
import {
  useCompanyRegister,
  useMyCompanyInfo,
  useUpdateCompanyInfo,
} from "@/hooks/apis/useCompanyApi";
import { useGetCode } from "@/hooks/apis/useCodeApi";
import { AxiosError } from "axios";

export default function Registration() {
  const searchParams = useSearchParams();
  const { data: businessCodes } = useGetCode("BUSINESS_AREA");
  const { data: myCompanyInfo } = useMyCompanyInfo(
    searchParams.get("type") === "edit"
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ICompanyRegisterRequest>({
    values: {
      name: myCompanyInfo?.name || "",
      main_address_detail: myCompanyInfo?.main_address_detail || "",
      sub_address_detail: myCompanyInfo?.sub_address_detail,
      business_number: regex.buisness_number(myCompanyInfo?.biz_no || ""),
      business_area_code:
        businessCodes?.codes.find(
          code => code.keyword === myCompanyInfo?.business_area
        )?.keyword || "",
      service_name: myCompanyInfo?.service_name || "",
      attachment_urls: myCompanyInfo?.attachment_urls,
      founded_at: regex.date_number(myCompanyInfo?.founded_at || ""),
      representative_name: myCompanyInfo?.representative || "",
      representative_phone_no: regex.phone_number(
        myCompanyInfo?.representative_phone_no || ""
      ),
      main_zip_code: myCompanyInfo?.main_zip_code || "",
      sub_zip_code: myCompanyInfo?.sub_zip_code,
      main_address: myCompanyInfo?.main_address || "",
      sub_address: myCompanyInfo?.sub_address,
      take: regex.money(myCompanyInfo?.take.toString() || ""),
      worker_number: myCompanyInfo?.workers_count || "",
      company_introduce: myCompanyInfo?.company_introduce || "",
      email: myCompanyInfo?.email || "",
      manager_name: myCompanyInfo?.manager_name || "",
      manager_phone_no: regex.phone_number(
        myCompanyInfo?.manager_phone_no || ""
      ),
      company_profile_url: myCompanyInfo?.company_logo_url,
    },
  });
  const { toast } = useToast();

  const [companyLogoPreview, setCompanyLogoPreview] = useState("");
  const [companyId, setCompanyId] = useState(0);
  const [previewFiles, setPreviewFiles] = useState<{
    bizRegistrationFile: File[];
    attachmentFile: File[];
  }>({ bizRegistrationFile: [], attachmentFile: [] });

  const companyLogoRef = useRef<HTMLInputElement>(null);
  const bizRegistrationRef = useRef<HTMLInputElement>(null);
  const attachmentRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: fileUpload } = useCreatePresignedURL();

  const { closeModal, openModal, modalState } = useModal();

  const uploadImgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files, multiple } = e.target;
    if (files) {
      if (files.length === 0) {
        if (name === "company_profile_url") {
          setValue("company_profile_url", undefined);
          setCompanyLogoPreview("");
        }
        return;
      }

      const validNamePattern = /^[a-zA-Z0-9.]+$/;
      const fileName = files[0].name;
      if (!validNamePattern.test(fileName)) {
        toast({
          payload: {
            type: "error",
            message: "파일 이름은 영어와 숫자로만 구성되어야 합니다.",
          },
        });
        return;
      }

      const response = await fileUpload(Array.from(files)).catch(
        (err: AxiosError<AxiosError>) => {
          if (err.response?.data.message === "Invalid Extension File") {
            toast({
              payload: {
                type: "error",
                message: "지원하지 않는 형식의 파일입니다.",
              },
            });
          }
        }
      );

      if (response) {
        if (name === "company_profile_url") {
          const reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onloadend = () => {
            setCompanyLogoPreview(reader.result as string);
          };
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

        multiple
          ? setValue(
              name as keyof ICompanyRegisterRequest,
              response?.data.urls.map(url => url.file_path)
            )
          : setValue(
              name as keyof ICompanyRegisterRequest,
              response?.data.urls[0].file_path
            );
      }
    }
  };

  const handleDelete = (idx: number) => {
    const { attachment_urls } = getValues();
    if (attachment_urls) {
      setValue("attachment_urls", [
        ...attachment_urls.slice(0, idx),
        ...attachment_urls.slice(idx + 1, attachment_urls.length),
      ]);
      setPreviewFiles(prev => ({
        ...prev,
        attachmentFile: [
          ...prev.attachmentFile.slice(0, idx),
          ...prev.attachmentFile.slice(idx + 1, attachment_urls.length),
        ],
      }));
    }
  };

  const businessAreas = businessCodes?.codes.map(item => item.keyword) ?? [];
  const { mutate: registerCompany } = useCompanyRegister();
  const { mutate: updateCompany } = useUpdateCompanyInfo(companyId);

  const onSubmit: SubmitHandler<ICompanyRegisterRequest> = data => {
    const {
      representative_phone_no,
      manager_phone_no,
      sub_address_detail,
      sub_zip_code,
      take,
      worker_number,
      business_area_code,
      business_number,
    } = data;

    const requests = {
      representative_phone_no: representative_phone_no.replaceAll("-", ""),
      manager_phone_no: manager_phone_no?.replaceAll("-", ""),
      sub_zip_code: sub_zip_code || undefined,
      sub_address_detail: sub_address_detail || undefined,
      take: +take.toString().replaceAll(",", ""),
      worker_number: +worker_number,
      business_area_code:
        businessCodes?.codes.find(
          code => code.keyword === business_area_code.toString()
        )?.code || 0,
    };

    searchParams.get("type") === "edit"
      ? updateCompany({
          ...data,
          ...requests,
        })
      : registerCompany({
          ...data,
          ...requests,
          business_number: business_number.replaceAll("-", ""),
        });
  };

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
        regex.buisness_number(
          decodeURI(searchParams.get("business-number") || "")
        )
      );
    } else {
      router.push("/");
    }
  }, [searchParams, router, setValue]);

  useEffect(() => {
    if (searchParams.get("type") === "edit") {
      if (myCompanyInfo) {
        setCompanyLogoPreview(
          `${process.env.NEXT_PUBLIC_IMAGE_URL}/${myCompanyInfo.company_logo_url}`
        );
        setCompanyId(myCompanyInfo.company_id);
        setPreviewFiles(prev => ({
          ...prev,
          bizRegistrationFile: myCompanyInfo.biz_registration_url
            ? [
                new File(
                  ["foo"],
                  myCompanyInfo.biz_registration_url.split("/")[1]?.slice(36)
                ),
              ]
            : [],
          attachmentFile: myCompanyInfo?.attachment_urls.map(
            url => new File(["foo"], url.split("/")[1]?.slice(36))
          ),
        }));
      }
    }
  }, [searchParams, setValue, myCompanyInfo, businessCodes]);

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

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
          /* eslint-disable react/jsx-key */
          <InputTemplate key="company-name" title="기업명" required>
            <Input
              width={604}
              disabled
              {...register("name", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.name?.message}
            />
          </InputTemplate>,
          <InputTemplate key="business-number" title="사업자번호" required>
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
          <InputTemplate
            key="representative-phone-no"
            title="기업 대표 번호"
            required
          >
            <Controller
              control={control}
              name="representative_phone_no"
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
                  errorMessage={errors.representative_phone_no?.message}
                />
              )}
            />
          </InputTemplate>,
          <InputTemplate key="representative-name" title="대표자" required>
            <Input
              width={604}
              placeholder="직접입력"
              {...register("representative_name", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.representative_name?.message}
            />
          </InputTemplate>,
          <InputTemplate key="founded-at" title="설립일" required>
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
          <InputTemplate key="main-address" title="주소(본사)" required>
            <Flex direction="column" gap={8}>
              <Flex gap={8}>
                <Input
                  width={367}
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => openModal("MAIN_ADDRESS")}
                >
                  검색
                </Button>
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
          <InputTemplate key="sub-address" title="주소(지점)">
            <Flex direction="column" gap={8}>
              <Flex gap={8}>
                <Input
                  width={367}
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => openModal("SUB_ADDRESS")}
                >
                  검색
                </Button>
              </Flex>
              <Input
                width={604}
                placeholder="상세주소 입력"
                {...register("sub_address_detail")}
                errorMessage={errors.sub_address_detail?.message}
              />
            </Flex>
          </InputTemplate>,
          <InputTemplate key="take" title="매출액(년)" required>
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
            />
          </InputTemplate>,
          <InputTemplate key="worker-number" title="총 근로자수(명)" required>
            <Controller
              control={control}
              name="worker_number"
              rules={{
                required: "필수 입력 항목입니다.",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  width={604}
                  placeholder="직접입력"
                  errorMessage={errors.worker_number?.message}
                  onChange={e => {
                    const value = e.target.value.replaceAll(/[^0-9]/g, "");
                    let numericValue = Number.parseInt(value, 10);
                    if (numericValue > 32_767) {
                      numericValue = 32_767;
                    } else if (numericValue < 0) {
                      numericValue = 0;
                    }
                    field.onChange(numericValue);
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
              )}
            />
          </InputTemplate>,
          <InputTemplate key="business-area-code" title="사업분야" required>
            <Flex direction="column" gap={4}>
              <S.Select
                isError={!!errors.business_area_code}
                {...register("business_area_code", {
                  required: "필수 선택 항목입니다.",
                })}
                onMouseDown={e => {
                  if (searchParams.get("type") === "edit") {
                    e.preventDefault();
                  }
                }}
                style={{
                  cursor:
                    searchParams.get("type") === "edit"
                      ? "not-allowed"
                      : "pointer",
                }}
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
          <Flex gap={10}>
            <InputTemplate key="manager-name" title="담당자명" required>
              <Input
                width={223}
                placeholder="직접입력"
                {...register("manager_name", {
                  required: "필수 입력 항목입니다.",
                })}
                errorMessage={errors.manager_name?.message}
              />
            </InputTemplate>
            <InputTemplate key="manager-phone-no" title="전화번호" required>
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
                    width={223}
                    placeholder="nnn-nnnn-nnnn"
                    maxLength={13}
                    onChange={e =>
                      field.onChange(regex.phone_number(e.target.value))
                    }
                    errorMessage={errors.manager_phone_no?.message}
                  />
                )}
              />
            </InputTemplate>
          </Flex>,
          <InputTemplate key="email" title="이메일" required>
            <Controller
              control={control}
              name="email"
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효한 이메일 형식이 아닙니다.",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  width={604}
                  placeholder="직접입력"
                  {...register("email")}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </InputTemplate>,
        ]}
      />
      <SubTitleTemplate
        key="service-name"
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
          <InputTemplate key="company-introduce" title="회사개요" required>
            <Textarea
              width={604}
              placeholder="직접입력"
              {...register("company_introduce", {
                required: "필수 입력 항목입니다.",
              })}
              errorMessage={errors.company_introduce?.message}
            />
          </InputTemplate>,
          <InputTemplate key="logo" title="회사로고">
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
              accept=".jpg, .png, .svg"
              ref={companyLogoRef}
              onChange={uploadImgFile}
            />
          </InputTemplate>,
          <InputTemplate key="biz-registration" title="사업자등록증">
            <Flex direction="column">
              <S.AddFileButton
                onClick={() => {
                  if (searchParams.get("type") !== "edit") {
                    onUploadFile(bizRegistrationRef);
                  }
                }}
                style={{
                  cursor:
                    searchParams.get("type") === "edit"
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                <Text fontSize="body2" fontWeight="regular">
                  파일 추가하기
                </Text>
                <Icon icon="Plus" color={themes.Color.primary[20]} />
              </S.AddFileButton>
              <Input
                name="biz_registration_url"
                type="file"
                accept=".jpg, .png, .svg, .ppt, .pptx, .hwp, .mp4, .txt, .zip, .pdf"
                style={{ display: "none" }}
                ref={bizRegistrationRef}
                onChange={uploadImgFile}
              />
              <Flex wrap="wrap" gap={8} style={{ width: 604, marginTop: 12 }}>
                {previewFiles.bizRegistrationFile.map(file => (
                  <S.FileWrapper key={file.name} type="button">
                    <Flex align="center" gap={4}>
                      <Icon
                        icon="FileEarmarkArrowDown"
                        size={16}
                        color={themes.Color.grayScale[60]}
                      />
                      <Text
                        fontSize="body3"
                        fontWeight="regular"
                        color={themes.Color.grayScale[60]}
                        whiteSpace="nowrap"
                        style={{ textOverflow: "ellipsis", maxWidth: 500 }}
                      >
                        {file.name}
                      </Text>
                    </Flex>
                    <Icon
                      icon="Close"
                      size={16}
                      color={themes.Color.grayScale[70]}
                      cursor="pointer"
                    />
                  </S.FileWrapper>
                ))}
              </Flex>
            </Flex>
          </InputTemplate>,
          <InputTemplate key="file" title="파일첨부">
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
                accept=".jpg, .png, .svg, .ppt, .pptx, .hwp, .mp4, .txt, .zip, .pdf"
                onChange={uploadImgFile}
                ref={attachmentRef}
                multiple
              />
              <Flex wrap="wrap" gap={8} style={{ width: 604, marginTop: 12 }}>
                {previewFiles.attachmentFile.map((file, idx) => (
                  <S.FileWrapper type="button">
                    <Flex align="center" gap={4}>
                      <Icon
                        icon="FileEarmarkArrowDown"
                        size={16}
                        color={themes.Color.grayScale[60]}
                      />
                      <Text
                        fontSize="body3"
                        fontWeight="regular"
                        color={themes.Color.grayScale[60]}
                        whiteSpace="nowrap"
                        style={{ textOverflow: "ellipsis", maxWidth: 500 }}
                      >
                        {file.name}
                      </Text>
                    </Flex>
                    <Icon
                      icon="Close"
                      size={16}
                      color={themes.Color.grayScale[70]}
                      cursor="pointer"
                      onClick={() => handleDelete(idx)}
                    />
                  </S.FileWrapper>
                ))}
              </Flex>
            </Flex>
          </InputTemplate>,
        ]}
      />
      <Flex justify="flex-end" gap={12} style={{ width: 850 }}>
        <Link href={searchParams.get("type") === "edit" ? "/my" : "/"}>
          <Button type="reset" variant="outline">
            취소
          </Button>
        </Link>
        <Button type="submit">확인</Button>
      </Flex>
      {(modalState === "MAIN_ADDRESS" || modalState === "SUB_ADDRESS") && (
        <Modal width={400} onClose={closeModal}>
          <DaumPostcode onComplete={selectAddress} />
        </Modal>
      )}
    </S.Container>
  );
}
