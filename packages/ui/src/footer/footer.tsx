import { themes } from "@jobis/design-token";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import { Icon } from "../icon";
import {
  FooterStyle,
  ContentStyle,
  HrStyle,
  DefaultTextStyle,
  MajorLabelStyle,
  FlexStyle,
  GapVariant,
  DirectionVariant,
  JustifyVariant,
  AlignVariant,
} from "./style.css";
import { MemberList, Contact } from "./utils";

export const Footer = () => {
  return (
    <footer className={clsx([FooterStyle])}>
      <div
        className={clsx([ContentStyle, FlexStyle])}
        style={assignInlineVars({
          [DirectionVariant]: "column",
          [JustifyVariant]: "space-between",
        })}
      >
        <div
          className={clsx([FlexStyle])}
          style={assignInlineVars({
            [DirectionVariant]: "row",
            [JustifyVariant]: "space-between",
          })}
        >
          <div
            className={clsx([FlexStyle, DefaultTextStyle])}
            style={assignInlineVars({
              [GapVariant]: "40px",
            })}
          >
            {Object.keys(MemberList).map((major: string) => {
              return (
                <div
                  className={clsx([FlexStyle])}
                  style={assignInlineVars({
                    [GapVariant]: "8px",
                    [DirectionVariant]: "column",
                    [JustifyVariant]: "start",
                  })}
                  key={major}
                >
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
          <div
            className={clsx([FlexStyle])}
            style={assignInlineVars({
              [GapVariant]: "25px",
            })}
          >
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
        <div
          className={clsx([FlexStyle, DefaultTextStyle])}
          style={assignInlineVars({
            [DirectionVariant]: "row",
            [JustifyVariant]: "space-between",
            [AlignVariant]: "end",
          })}
        >
          <p>{Contact}</p>
          <p>©2023 Copyright team-return ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
