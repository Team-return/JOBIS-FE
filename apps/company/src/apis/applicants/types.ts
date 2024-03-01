export interface ICompanyApplicantsResponse {
  applications: IApplications[];
  count: number;
}

interface IApplications {
  application_id: number;
  student_number: string;
  student_name: string;
  profile_image_url: string;
  attachments: IAttachments[];
  created_at: string;
}

interface IAttachments {
  url: string;
  type: string;
}
