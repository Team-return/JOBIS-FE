import { themes } from "@jobis/design-token";
import { clsx } from "clsx";
import * as React from "react";
import { Icon } from "../icon";
import { Text } from "../texts";
import {
  CheckboxBackgroundStyle,
  CheckboxBackgroundStyleDetail,
  CheckboxStyle,
  CursorStyle,
  LabelStyle,
} from "./style.css";
import { CheckboxPropsType } from "./types";

export const Checkbox = React.forwardRef(
  (props: CheckboxPropsType, ref: React.Ref<HTMLInputElement>) => {
    const { children, disabled, checked, ...checkboxProps } = props;

    return (
      <label className={clsx([LabelStyle, CursorStyle({ cursor: disabled })])}>
        <div
          className={clsx([
            CheckboxBackgroundStyle,
            !disabled && CheckboxBackgroundStyleDetail,
          ])}
        >
          <input
            className={clsx([CheckboxStyle])}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            ref={ref}
            {...checkboxProps}
          />
          {checked && (
            <Icon icon="Check" size={12} color={themes.Color.grayScale[10]} />
          )}
        </div>
        <Text
          as="span"
          fontSize="body1"
          color={
            disabled ? themes.Color.grayScale[50] : themes.Color.grayScale[90]
          }
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
          {children}
        </Text>
      </label>
    );
  }
);
