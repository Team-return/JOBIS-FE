import React from "react";
import { Radio } from './index'

export interface RadioType {
  checked: boolean;
  children?: React.ReactNode;
  onClick: () => void;
  value: string;
}

export interface RadioGroupType {
  children: React.ReactElement<typeof Radio> | React.ReactElement<typeof Radio>[];
  direction: "column" | "row";
  className: string;
  defalutValue: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>
}