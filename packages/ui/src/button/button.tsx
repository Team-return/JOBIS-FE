import * as React from "react";
import { ButtonProps } from "./types";
import { clsx } from "clsx";
import { themes } from "@jobis/design-token";
import {
  ButtonStyle,
  EnableColorVariant,
  HoverColorVariant,
  ActiveColorVariant,
  SpinnerStyle,
  SpanStyle,
} from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      isLoading,
      disabled,
      variant = "solid",
      style,
      leftIcon,
      rightIcon,
      onKeyDown,
      ...buttonProps
    } = props;

    const enableColor = themes.Color.primary[20];
    const hoverColor =
      variant === "solid" ? "#4D82B2" : themes.Color.primary[20];
    const activeColor = themes.Color.primary[30];

    const isDisabed = isLoading || disabled;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);

      if (event.key === "Enter" || event.key === "13") {
        event.preventDefault();
        event.currentTarget.click();
      }
    };

    return (
      <button
        className={clsx([ButtonStyle({ variant })])}
        ref={ref}
        data-loading={isLoading}
        onKeyDown={handleKeyDown}
        role="button"
        disabled={isDisabed}
        style={{
          ...assignInlineVars({
            [EnableColorVariant]: enableColor,
            [HoverColorVariant]: hoverColor,
            [ActiveColorVariant]: activeColor,
          }),
          ...style,
        }}
        {...buttonProps}
      >
        {!disabled && isLoading && <div className={SpinnerStyle} />}
        {leftIcon && <span className={SpanStyle}>{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className={SpanStyle}>{rightIcon}</span>}
      </button>
    );
  }
);
