import {
  FooterStyle,
  ContentStyle,
  HrStyle,
  DefaultTextStyle,
  CopyrightStyle,
  MemberAndLink,
  MemberTableStyle,
  MemberSectionStyle,
  MajorLabelStyle,
  SocialmediaLinksStyle,
} from "./style.css";
import { clsx } from "clsx";
import { Icon } from "../icon";
import { themes } from "@jobis/design-token";
import { MembersListType } from "./types";

export const Footer = () => {
  const membersInfo: MembersListType = {
    Frontend: ["강용수", "강지인", "정지관"],
    Backend: ["강민", "길근우", "이하성"],
    Android: ["정승훈"],
    iOS: ["홍승재"],
    Design: ["김하온", "박시원"],
  };

  return (
    <footer className={clsx([FooterStyle])}>
      <div className={clsx([ContentStyle])}>
        <div className={clsx([MemberAndLink])}>
          <div className={clsx([MemberTableStyle, DefaultTextStyle])}>
            {Object.keys(membersInfo).map((major: keyof MembersListType) => {
              return (
                <div className={clsx([MemberSectionStyle])} key={major}>
                  <p className={clsx([MajorLabelStyle])}>{major}</p>
                  {membersInfo[major].map((name, idx) => (
                    <p className={clsx([DefaultTextStyle])} key={idx}>
                      {name}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
          <div className={clsx([SocialmediaLinksStyle])}>
            <a href="https://github.com/Team-return" target="_blank">
              <Icon
                icon="Return"
                size={36}
                color={themes.Color.grayScale[10]}
              />
            </a>
            <a
              href="https://team-return.notion.site/Team-return-0c0a7ac7c765479fabed003f6adbe5bd"
              target="_blank"
            >
              <Icon
                icon="Github"
                size={36}
                color={themes.Color.grayScale[10]}
              />
            </a>
          </div>
        </div>
        <hr className={clsx([HrStyle])} />
        <div className={clsx([CopyrightStyle, DefaultTextStyle])}>
          <p>
            {`연락처) 042-000-0000 
이메일) team-return@team-return.com 
주소) 대전광역시 유성구 가정북로 76(창의관 산학협력부)`}
          </p>
          <p>©2023 Copyright team-return ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
