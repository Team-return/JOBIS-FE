import { ApplicationENStatusType } from "@/@types/types";

export type ApplicationResponse = {
  applications: ApplicationType[];
};

export type ApplicationType = {
  application_id: number;
  student_name: string;
  student_gcn: string;
  company_name: string;
  attachments: AttachmentUrlType[];
  created_at: string;
  application_status: ApplicationENStatusType;
};

export type AttachmentUrlType = {
  url: string;
  type: string;
};
