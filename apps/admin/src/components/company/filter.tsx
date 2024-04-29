import { Button, Dropdown, Input, Stack } from "@/components";
import { useCompanyFilter, useSelectCompanyId } from "@/stores";
import toast from "react-hot-toast";
import { Text } from "@jobis/ui";
import { CompanyIcon, DownArrowIcon, Rollback } from "@assets/images";
import { themes } from "@jobis/design-token";
import { useChangeCompanyMOU, useChangeCompanyType, useGetCodes } from "@/apis";
import { useState } from "react";
import { CompanyType } from "@@types/types";
import { useDidMountEffect } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

export const CompanyFilter = () => {
  const [companyType, setCompanyType] = useState<CompanyType>("CONTRACTING");

  const queryClient = useQueryClient();

  const {
    companyFilter,
    setDropdownCompanyFilter,
    setInputCompanyFilter,
    resetCompanyFilter,
  } = useCompanyFilter();

  const { selectCompanyId, resetSelectCompanyId } = useSelectCompanyId();

  const { data: businessAreas } = useGetCodes("BUSINESS_AREA");

  const {
    mutate: changeCompanyTypeMutate,
    isPending: changeCompanyTypeIsPending,
  } = useChangeCompanyType(companyType, selectCompanyId, {
    onSuccess: () => {
      resetSelectCompanyId();
      toast.success("기업구분 변경에 성공하였습니다.");
      queryClient.invalidateQueries({ queryKey: ["getAllCompany"] });
    },
  });
  const {
    mutate: changeCompanyMOUMutate,
    isPending: changeCompanyMOUIsPending,
  } = useChangeCompanyMOU(selectCompanyId, {
    onSuccess: () => {
      resetSelectCompanyId();
      toast.success("협약기업 변경에 성공하였습니다.");
      queryClient.invalidateQueries({ queryKey: ["getAllCompany"] });
    },
  });

  useDidMountEffect(() => {
    changeCompanyTypeMutate();
  }, [companyType]);

  return (
    <Stack justify="space-between" align="center" margin="16px 0 24px 0">
      <Stack align="center" gap={8}>
        <Dropdown
          placeholder="기업구분"
          width={95}
          value={companyFilter.division}
          options={["전체", "선도기업", "참여기업", "협약기업"]}
          changeHandler={item => {
            setDropdownCompanyFilter("division", item === "전체" ? "" : item);
          }}
        />
        <Dropdown
          placeholder="지역"
          width={95}
          value={companyFilter.region}
          options={[
            "전체",
            "서울",
            "경기",
            "인천",
            "대전",
            "충청",
            "전라",
            "경상",
            "제주",
            "강원",
          ]}
          changeHandler={item => {
            setDropdownCompanyFilter("region", item === "전체" ? "" : item);
          }}
        />
        <Dropdown
          placeholder="사업분야"
          width={95}
          value={companyFilter.businessArea}
          options={["전체"].concat(
            businessAreas?.codes.map(code => code.keyword) || []
          )}
          changeHandler={item => {
            setDropdownCompanyFilter(
              "businessArea",
              item === "전체" ? "" : item
            );
          }}
        />
        <Input
          width={280}
          placeholder="기업명을 검색하세요."
          isSearch={true}
          value={companyFilter.companyName}
          name="companyName"
          onChange={setInputCompanyFilter}
        />
      </Stack>
      <Stack justify="flex-end" gap={8}>
        <Button
          width={120}
          disabled={
            !companyFilter.division &&
            !companyFilter.region &&
            !companyFilter.businessArea &&
            !companyFilter.companyName
          }
          icon={<Rollback stroke={themes.Color.primary[20]} />}
          onClick={() => {
            resetCompanyFilter();
            toast.success("필터 초기화에 성공하였습니다.");
          }}
        >
          <Text fontSize="body3" fontWeight="regular">
            필터 초기화
          </Text>
        </Button>
        <Button
          width={128}
          icon={<img src={CompanyIcon} />}
          disabled={changeCompanyTypeIsPending || selectCompanyId.length === 0}
          onClick={() => {
            setCompanyType("PARTICIPATING");
          }}
        >
          <Text fontSize="body3" fontWeight="regular">
            참여기업 등록
          </Text>
        </Button>
        <Button
          width={128}
          icon={<img src={CompanyIcon} />}
          disabled={changeCompanyTypeIsPending || selectCompanyId.length === 0}
          onClick={() => {
            setCompanyType("LEAD");
          }}
        >
          <Text fontSize="body3" fontWeight="regular">
            선도기업 등록
          </Text>
        </Button>
        <Button
          width={104}
          icon={<img src={DownArrowIcon} />}
          disabled={changeCompanyMOUIsPending || selectCompanyId.length === 0}
          onClick={() => {
            changeCompanyMOUMutate();
          }}
        >
          <Text fontSize="body3" fontWeight="regular">
            협약등록
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
};
