import * as React from "react";
import { ButtonProps } from "./types";
import { clsx } from "clsx";
import { themes } from "@jobis/design-token";
import {
  buttonStyle,
  enableColorVariant,
  hoverColorVariant,
  activeColorVariant,
  spinnerStyle,
  spanStyle,
} from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const Button = (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const {
    children,
    isLoading,
    isDisabled,
    variant = "solid",
    style,
    leftIcon,
    rightIcon,
    onKeyDown,
    ...buttonProps
  } = props;

  const enableColor = themes.color.primary[20];
  const hoverColor = variant === "solid" ? "#4D82B2" : themes.color.primary[20];
  const activeColor = themes.color.primary[30];

  const disabled = isLoading || isDisabled;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);

    if (event.key === "Enter" || event.key === "13") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <button
      className={clsx([buttonStyle({ variant })])}
      ref={ref}
      onKeyDown={handleKeyDown}
      role="button"
      disabled={disabled}
      style={{
        ...assignInlineVars({
          [enableColorVariant]: enableColor,
          [hoverColorVariant]: hoverColor,
          [activeColorVariant]: activeColor,
        }),
        ...style,
      }}
      {...buttonProps}
    >
      {isLoading && <div className={spinnerStyle} />}
      {leftIcon && <span className={spanStyle}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={spanStyle}>{rightIcon}</span>}
    </button>
  );
};

const _Button = React.forwardRef(Button);
export { _Button as Button };
