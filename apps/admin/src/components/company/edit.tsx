import { styled } from "styled-components";
import { themes } from "@jobis/design-token";
import { CompanyIcon, LeftArrow, LoudSpeaker, Required } from "@/assets/images";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Textarea } from "@jobis/ui";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { Address } from "react-daum-postcode";
import { formatValue } from "@/utils/regex";

interface ButtonProps {
  radius: string;
  width: string;
  height: string;
  color: string;
  backGround?: string;
  borderColor?: string;
}

export const CompanyEdit = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [modalState, setModalState] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [subAddress, setSubAddress] = useState("");
  const { id } = useParams();

  const infos = [
    { text: "대표 서비스명" },
    { text: "대표자" },
    { text: "대표번호", maxLength: 13 },
    { text: "설립일", maxLength: 8 },
    { text: "담당자" },
    { text: "전화번호", maxLength: 13 },
    { text: "담당자2" },
    { text: "전화번호2", maxLength: 13 },
    { text: "매출액" },
    { text: "근로자 수" },
    { text: "사업분야" },
    { text: "팩스번호", maxLength: 11 },
    { text: "본사주소" },
    { text: "이메일" },
    { text: "지점주소" },
  ];

  const navigate = useNavigate();

  const closeModal = () => {
    setModalState("");
  };
  const openModal = (addressType: "MAIN_ADDRESS" | "SUB_ADDRESS") => {
    setModalState(addressType);
  };

  const selectAddress = (data: Address) => {
    if (modalState === "MAIN_ADDRESS") {
      setMainAddress(data?.address);
    } else if (modalState === "SUB_ADDRESS") {
      setSubAddress(data?.address);
    }
    closeModal();
  };

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: formatValue(value, key),
    }));
  };
  return (
    <Wrapper>
      <ButtonDiv>
        <Button
          radius="102px"
          width="131px"
          color={themes.Color.grayScale[60]}
          height="42px"
          borderColor={themes.Color.grayScale[60]}
          onClick={() => navigate(`/company/${id}`)}
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
          // onClick={}
          type="submit"
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
          <Textarea isRequired placeholder="회사소개" />
        </Info>
        <Info>
          <Title>
            <img src={LoudSpeaker} />
            <span>상세정보</span>
          </Title>
          <InfoContents>
            {infos.map((data, index) => (
              <div key={index}>
                <span>
                  {data.text}
                  <img src={Required} />
                </span>
                {data.text === "본사주소" || data.text === "지점주소" ? (
                  <div className="address">
                    <span>
                      <Input
                        placeholder={data.text}
                        disabled
                        value={
                          data.text === "본사주소" ? mainAddress : subAddress
                        }
                      />
                      <Button
                        radius="4px"
                        width="155px"
                        height="56px"
                        color={themes.Color.primary[20]}
                        borderColor={themes.Color.primary[20]}
                        onClick={() =>
                          openModal(
                            data.text === "본사주소"
                              ? "MAIN_ADDRESS"
                              : "SUB_ADDRESS"
                          )
                        }
                      >
                        주소검색
                      </Button>
                    </span>
                    <Input placeholder="상세주소" />
                  </div>
                ) : (
                  <div>
                    <Input
                      isRequired
                      placeholder={data.text}
                      value={formData[data.text] || ""}
                      onChange={e => handleChange(data.text, e.target.value)}
                      maxLength={data.maxLength}
                      errorMessage={
                        data.text === "이메일" &&
                        formData[data.text] &&
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[data.text])
                          ? "올바른 이메일 주소를 입력해주세요."
                          : ""
                      }
                      type={data.text === "근로자 수" ? "number" : "text"}
                      onWheel={e => e.currentTarget.blur()}
                      onKeyDown={e => {
                        if (e.key === "-" || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      min={0}
                    />
                  </div>
                )}
              </div>
            ))}
          </InfoContents>
        </Info>
      </Contents>
      {(modalState === "MAIN_ADDRESS" || modalState === "SUB_ADDRESS") && (
        <Modal onClick={closeModal}>
          <div>
            <DaumPostcode onComplete={selectAddress} />
          </div>
        </Modal>
      )}
    </Wrapper>
  );
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  background: rgb(0 0 0 / 8%);

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
  }
`;

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
  column-gap: 120px;

  > div {
    display: flex;
    justify-content: space-between;
    width: 400px;

    > span {
      display: flex;

      font-size: ${themes.Font.body1.fontSize};
      font-weight: ${themes.FontWeight.bold};

      > img {
        width: 10px;
        height: 10px;
      }
    }

    > div {
      width: 280px;
    }

    > div.address {
      display: flex;
      flex-direction: column;
      gap: 8px;

      > span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
      }
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

const Button = styled.button<ButtonProps>`
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
