import { applicationStatus } from "@/@types/enums";

export type ApplicationENStatusType = keyof typeof applicationStatus;
export type ApplicationKRStatusType =
  (typeof applicationStatus)[keyof typeof applicationStatus];
