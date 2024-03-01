import React, { SetStateAction, useCallback, useState } from "react";
import { useFileUpload } from "./apis/useFilesApi";
import { IFileResponse } from "@/apis/files/types";

export const useUpload = <T, K>(
  initialFile: T,
  setForm: React.Dispatch<SetStateAction<K>>
) => {
  const [files, setFiles] = useState<T>(initialFile);

  const { mutate: fileUpload } = useFileUpload();

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files: eventFile, name, multiple } = e.target;
      if (!files) {
        return;
      }
      setFiles({ ...files, [name]: Array.from(eventFile || []) });
      const formData = new FormData();

      if (eventFile) {
        for (let i = 0; i < eventFile?.length; i++) {
          formData.append("file", eventFile[i]);
        }

        fileUpload(formData, {
          onSuccess: (res: IFileResponse) => {
            multiple
              ? setForm(prev => ({ ...prev, [name + "_urls"]: res.urls }))
              : setForm(prev => ({ ...prev, [name + "_url"]: res.urls[0] }));
          },
        });
      }
    },

    [files, fileUpload, setForm]
  );

  return { onUploadImage, files, setFiles };
};
