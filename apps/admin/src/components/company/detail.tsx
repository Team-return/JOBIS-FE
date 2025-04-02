import { styled } from "styled-components";
import { themes } from "@jobis/design-token";
import { CompanyIcon, LeftArrow, LoudSpeaker } from "@/assets/images";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetCompanyDetail } from "@/apis";

interface ButtonProps {
  radius: string;
  width: string;
  height: string;
  color: string;
  backGround?: string;
  borderColor?: string;
}

export const CompanyDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useGetCompanyDetail(location.pathname.split("/")[2]);

  const infos = [
    ["대표 서비스명", data?.service_name],
    ["대표자", data?.representative_name],
    ["대표번호", data?.representative_phone_no],
    ["설립일", data?.founded_at],
    ["담당자", data?.manager_name],
    ["전화번호", data?.manager_phone_no],
    ["담당자2", ""],
    ["전화번호2", ""],
    ["매출액", data?.take],
    ["근로자 수", data?.worker_number],
    ["사업분야", data?.business_area],
    ["팩스번호", ""],
    ["본사주소", data?.main_address],
    ["이메일", data?.email],
    ["지점주소", ""],
  ];

  return (
    <Wrapper>
      <ButtonDiv>
        <Button
          radius="102px"
          width="131px"
          color={themes.Color.grayScale[60]}
          height="42px"
          borderColor={themes.Color.grayScale[60]}
          onClick={() => navigate("/company")}
        >
          <img src={LeftArrow} /> 돌아가기
        </Button>
      </ButtonDiv>
      <Header>
        <span>
          <img
            src={
              data?.company_profile_url
                ? `${import.meta.env.VITE_FILE_URL}${data.company_profile_url}`
                : "https://dsm-s3-bucket-jobis.s3.ap-northeast-2.amazonaws.com/LOGO_IMAGE/companydefault.png"
            }
          />
          {data?.company_name || ""}
        </span>
        <Button
          radius="96px"
          width="66px"
          height="40px"
          color={themes.Color.primary[20]}
          backGround={themes.Color.primary[10]}
          onClick={() => navigate("edit")}
        >
          수정
        </Button>
      </Header>
      <Contents>
        <Info>
          <Title>
            <img src={CompanyIcon} />
            <span>회사소개</span>
          </Title>
          <div>{data?.company_introduce}</div>
        </Info>
        <Info>
          <Title>
            <img src={LoudSpeaker} />
            <span>상세정보</span>
          </Title>
          <div>
            <InfoContents>
              {infos.map(([label, value], index) => (
                <div key={index}>
                  <span>{label}</span>
                  {value || "-"}
                </div>
              ))}
            </InfoContents>
          </div>
        </Info>
      </Contents>
    </Wrapper>
  );
};

const Title = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${themes.Color.grayScale[50]};

  > span {
    color: ${themes.Color.primary[20]};
    font-weight: ${themes.FontWeight.bold};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoContents = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  > div {
    display: flex;
    justify-content: start;
    width: 388px;

    > span {
      width: 108px;

      font-size: ${themes.Font.body1.fontSize};
      font-weight: ${themes.FontWeight.bold};
    }
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 920px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > span {
    display: flex;
    align-items: center;
    height: 72px;

    font-size: ${themes.Font.h4.fontSize};
    font-weight: ${themes.FontWeight.bold};
    gap: 24px;

    > img {
      width: 72px;
      height: 72px;
      border-radius: 16px;
    }
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const Button = styled.div<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid ${({ borderColor }) => borderColor || "transparent"};
  border-radius: ${({ radius }) => radius};

  background-color: ${({ backGround }) => backGround || "transparent"};

  color: ${({ color }) => color};
  font-size: ${themes.Font.body1.fontSize};
  font-weight: ${themes.FontWeight.medium};
  gap: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;
