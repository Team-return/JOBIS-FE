import * as React from "react";

export interface RadioType extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  onClick?: () => void;
}
