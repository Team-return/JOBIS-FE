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
import { MemberList, Contact } from "./utils";

export const Footer = () => {
  return (
    <footer className={clsx([FooterStyle])}>
      <div className={clsx([ContentStyle])}>
        <div className={clsx([MemberAndLink])}>
          <div className={clsx([MemberTableStyle, DefaultTextStyle])}>
            {Object.keys(MemberList).map((major: string) => {
              return (
                <div className={clsx([MemberSectionStyle])} key={major}>
                  <p className={clsx([MajorLabelStyle])}>{major}</p>
                  {MemberList[major].map((name, idx) => (
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
          <p>{Contact}</p>
          <p>©2023 Copyright team-return ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
