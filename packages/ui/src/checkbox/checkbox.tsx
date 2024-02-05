import * as React from "react";
import { CheckboxProps } from "./types";
import {
  checkboxBackgroundStyle,
  checkboxBackgroundStyleDetail,
  checkboxStyle,
  cursorStyle,
  labelStyle,
  textStyle,
} from "./style.css";
import { clsx } from "clsx";
import { Text } from "../texts";
import { themes } from "@jobis/design-token";
import { Icon } from "../icon";

const Checkbox = (props: CheckboxProps, ref: React.Ref<HTMLInputElement>) => {
  const { children, disabled, checked, ...checkboxProps } = props;

  return (
    <label className={clsx([labelStyle, cursorStyle({ cursor: disabled })])}>
      <div
        className={clsx([
          checkboxBackgroundStyle,
          !disabled && checkboxBackgroundStyleDetail,
        ])}
      >
        <input
          className={clsx([checkboxStyle])}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          ref={ref}
          {...checkboxProps}
        />
        {checked && (
          <Icon icon="Check" size={12} color={themes.color.grayScale[10]} />
        )}
      </div>
      <Text
        as="span"
        fontSize="body1"
        color={
          disabled ? themes.color.grayScale[50] : themes.color.grayScale[90]
        }
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {children}
      </Text>
    </label>
  );
};

const _Checkbox = React.forwardRef(Checkbox);
export { _Checkbox as Checkbox };
