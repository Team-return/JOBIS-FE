import type { AttachmentUrlType } from "@/apis";

export const convertFileName = (obj: AttachmentUrlType) => {
  const attachmentName = (attachment: string) => {
    return attachment.split("/").at(-1)!;
  };

  return obj.type === "FILE" ? attachmentName(obj.url).slice(37) : obj.url;
};
