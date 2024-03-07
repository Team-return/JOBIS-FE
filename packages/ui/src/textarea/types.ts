import * as React from "react";
import { ColorType } from "../core/types";

type UseTextareaProps = {
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"textarea">, "readOnly">;

export type TextareaProps = UseTextareaProps & {
  errorMessage?: string;
  errorBorderColor?: ColorType;
  focusBorderColor?: ColorType;
  width?: number;
};
