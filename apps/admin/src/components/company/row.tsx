import { css, styled } from "styled-components";
import { Text } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { CompanyCellData } from "@/constants";
import { Checkbox, Stack } from "@/components";
import type { CompanyType } from "@/apis";
import { useModal, useSelectCompanyId } from "@/stores";
import { useNavigate } from "react-router-dom";
import { CompanyTypeEnToKr } from "@/@types/enums";
import { ReviewModal } from "@/pages";

type PropsType = {
  data: CompanyType;
};

export const CompanyRow = ({ data }: PropsType) => {
  const navigate = useNavigate();
  const { selectCompanyId, addSelectCompanyId, deleteSelectCompanyId } =
    useSelectCompanyId();

  const isSelect = selectCompanyId.includes(data.company_id);

  const clickHandler = () => {
    if (isSelect) {
      deleteSelectCompanyId(data.company_id);
    } else {
      addSelectCompanyId(data.company_id);
    }
  };

  const { openModal } = useModal();

  return (
    <Container position="relative" align="center" onClick={clickHandler}>
      <CheckboxWrapper className="checkbox">
        <Checkbox checked={isSelect} onChange={() => {}} />
      </CheckboxWrapper>
      <StyleText
        $width={CompanyCellData[0].width}
        fontSize="body2"
        fontWeight="medium"
        $color={themes.Color.grayScale[80]}
        style={{
          justifyContent: "flex-start",
          textAlign: "start",
          padding: "0px",
        }}
        $isClick={true}
        onClick={e => {
          e.stopPropagation();
          navigate(`/company/${data.company_id}`);
        }}
      >
        {data.company_name}
      </StyleText>
      <StyleText
        $width={CompanyCellData[1].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.region}
      </StyleText>
      <StyleText
        $width={CompanyCellData[2].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.business_area}
      </StyleText>
      <StyleText
        $width={CompanyCellData[3].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.workers_count}명
      </StyleText>
      <StyleText
        $width={CompanyCellData[4].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.take}억
      </StyleText>
      <StyleText
        $width={CompanyCellData[5].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {CompanyTypeEnToKr[data.company_type]}
      </StyleText>
      <StyleText
        $width={CompanyCellData[6].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.convention ? "Y" : "-"}
      </StyleText>
      <StyleText
        $width={CompanyCellData[7].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.personal_contact ? "Y" : "-"}
      </StyleText>
      <StyleText
        $width={CompanyCellData[8].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.recent_recruit_year ? `${data.recent_recruit_year}년` : "-"}
      </StyleText>
      <StyleText
        $width={CompanyCellData[9].width}
        fontSize="body2"
        fontWeight="medium"
      >
        {data.total_acceptance_count}명
      </StyleText>
      <StyleText
        $width={CompanyCellData[10].width}
        fontSize="body2"
        fontWeight="medium"
        style={{ justifyContent: "flex-end", padding: "0px" }}
        $isClick={!!data.review_count}
        onClick={e => {
          data.review_count && e.stopPropagation();
          openModal({
            children: <ReviewModal id={data.company_id} />,
          });
        }}
      >
        {data.review_count || 0}건
      </StyleText>
    </Container>
  );
};

const Container = styled(Stack)`
  cursor: pointer;
  border-bottom: 1px solid ${themes.Color.grayScale[40]};

  &:hover {
    background-color: ${themes.Color.grayScale[30]};

    .checkbox {
      background-color: ${themes.Color.grayScale[30]};

      :first-child {
        border-color: ${themes.Color.grayScale[10]};

        :checked {
          border: none;
        }
      }
    }
  }
`;

const CheckboxWrapper = styled.div`
  position: absolute;
  left: -40px;
  display: flex;
  align-items: center;
  width: 40px;
  height: calc(100% + 2px);
  border-bottom: 1px solid ${themes.Color.grayScale[40]};
  border-top: 1px solid ${themes.Color.grayScale[40]};
  cursor: pointer;
`;

const StyleText = styled(Text)<{
  $width: string;
  $isClick?: boolean;
  $color?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width};
  height: 80px;
  padding: 0 8px;

  word-break: keep-all;

  text-align: center;
  ${({ $isClick }) =>
    $isClick &&
    css`
      text-decoration: underline;
      text-underline-offset: 2px;
    `}
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
`;
