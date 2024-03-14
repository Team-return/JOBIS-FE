import React from "react";

export interface ISubTitleTemplate {
  components?: React.ReactNode[];
  title: string;
  button?: React.ReactNode;
  requiredMessage?: boolean;
}
