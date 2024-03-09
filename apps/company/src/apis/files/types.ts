export interface PresignedURLResponse {
  urls: ResignedURLResponseItem[];
}

interface ResignedURLResponseItem {
  file_path: string;
  pre_signed_url: string;
}
