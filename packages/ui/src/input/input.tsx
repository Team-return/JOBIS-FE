import * as React from "react";
import type { InputProps } from "./types";
import { themes } from "@jobis/design-token";
import { Text } from "../texts";
import {
  ErrorBorderColorVariant,
  FocusBorderColorVariant,
  IconStyle,
  InputStyle,
  InputWrapper,
  LabelStyle,
} from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      errorMessage,
      errorBorderColor = themes.Color.subColor.red[20],
      focusBorderColor = themes.Color.primary[20],
      label,
      icon,
      width,
      ...inputProps
    },
    ref
  ) => {
    return (
      <label className={LabelStyle} style={{ width }}>
        {label}
        <div className={InputWrapper}>
          <input
            data-isError={!!errorMessage}
            data-isIcon={!!icon}
            className={InputStyle}
            ref={ref}
            style={{
              ...assignInlineVars({
                [ErrorBorderColorVariant]: errorBorderColor,
                [FocusBorderColorVariant]: focusBorderColor,
              }),
            }}
            {...inputProps}
          />
          {icon && <span className={IconStyle}>{icon}</span>}
        </div>
        <Text fontSize="caption" color={themes.Color.subColor.red[20]}>
          {errorMessage}
        </Text>
      </label>
    );
  }
);
