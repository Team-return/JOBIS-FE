import * as React from "react";
import { ColorType } from "../core/types";

type UseInputProps = {
  label?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"input">, "readOnly">;

export type InputProps = UseInputProps & {
  errorMessage?: string;
  errorBorderColor?: ColorType;
  focusBorderColor?: ColorType;
  icon?: React.ReactNode;
};
