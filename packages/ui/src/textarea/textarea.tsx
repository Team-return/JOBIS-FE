import * as React from "react";
import type { TextareaProps } from "./types";
import { themes } from "@jobis/design-token";
import { Text } from "../texts";
import {
  ErrorBorderColorVariant,
  FocusBorderColorVariant,
  TextareaStyle,
} from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      errorMessage,
      errorBorderColor = themes.Color.subColor.red[20],
      focusBorderColor = themes.Color.primary[20],
      width,
      ...textareaProps
    },
    ref
  ) => {
    return (
      <label>
        <textarea
          data-isError={!!errorMessage}
          className={TextareaStyle}
          ref={ref}
          style={{
            ...assignInlineVars({
              [ErrorBorderColorVariant]: errorBorderColor,
              [FocusBorderColorVariant]: focusBorderColor,
            }),
            width,
          }}
          {...textareaProps}
        />
        <Text fontSize="caption" color={themes.Color.subColor.red[20]}>
          {errorMessage}
        </Text>
      </label>
    );
  }
);
