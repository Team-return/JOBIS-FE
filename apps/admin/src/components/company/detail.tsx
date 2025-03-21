import { styled } from "styled-components";
import { themes } from "@jobis/design-token";
import { CompanyIcon, LeftArrow, LoudSpeaker } from "@/assets/images";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  radius: string;
  width: string;
  height: string;
  color: string;
  backGround?: string;
  borderColor?: string;
}

export const CompanyDetail = () => {
  const infos = [
    "대표 서비스명",
    "대표자",
    "대표번호",
    "설립일",
    "담당자",
    "전화번호",
    "담당자2",
    "전화번호2",
    "매출액",
    "근로자 수",
    "사업분야",
    "팩스번호",
    "본사주소",
    "이메일",
    "지점주소",
  ];
  const navigate = useNavigate();

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
          <img src={LeftArrow} />
          돌아가기
        </Button>
      </ButtonDiv>
      <Header>
        <span>
          <img src="https://i.pinimg.com/236x/4b/4a/3d/4b4a3de254fcd11bc5efa1c3150dbe75.jpg" />
          (주)겟차겟차겟차
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
          <div>
            겟 차는 오프 라인 자동차 구매 경험을 온 라 인으로 전환 하고 고객
            중심 경험으로 개선 하기 위해 \n기술 개발과 시장 확장에 몰입하고 있
            습니다. 그 결과 2015 년 창업 이후, 현재 누적 다운로드\n200만 건과
            30겟차는 오프라인 자동차 구매 경험을 온라인으로 전환하고 고객 중심
            경험으로 개선하기 위해\n기술 개발과 시장 확장에 몰입하고 있습니다.
            그 결과로 2015 년 창업 이후, 현재 누적 다운로드\n200만 건과 30험을
            온라인으로 전환하
          </div>
        </Info>
        <Info>
          <Title>
            <img src={LoudSpeaker} />
            <span>상세정보</span>
          </Title>
          <InfoContents>
            {infos.map((data, index) => (
              <div key={index}>
                <span>{data}</span>
                {index}
              </div>
            ))}
          </InfoContents>
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

  > div {
    color: ${themes.Color.grayScale[80]};
    font-size: ${themes.Font.body2.fontSize};
    font-weight: ${themes.FontWeight.regular};
  }
`;

const InfoContents = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  > div {
    display: flex;
    justify-content: space-between;
    width: 200px;

    > span {
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
