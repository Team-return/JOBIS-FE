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

export type EmploymentStatsResponse = {
  classes: {
    class_id: number;
    employment_rate_response_list: {
      id: number;
      company_name: string;
      logo_url: string;
    }[];
    total_students: number;
    passed_students: number;
  }[];
};
