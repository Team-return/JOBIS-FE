import * as React from "react";

export type ButtonProps = {
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "solid" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
