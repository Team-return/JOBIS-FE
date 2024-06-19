import { getFile } from "@/apis";
import { Stack } from "@/components";
import { convertFileName } from "@/utils";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { Text } from "@jobis/ui";
import { themes } from "@jobis/design-token";

export const FileDetail = () => {
  const [searchParams] = useSearchParams();
  const [file, setFile] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getFile(searchParams.get("url")!)
      .then(res => {
        const blobData = new Blob([res.data], { type: "application/pdf" });
        const Link = window.URL.createObjectURL(blobData);
        setFile(Link);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {convertFileName({ type: "FILE", url: searchParams.get("url")! })}
        </title>
      </Helmet>
      <Stack margin="70px 0 0 0">
        {isError ? (
          <Stack justify="center" align="center" height="calc(100vh - 70px)">
            <Text
              fontSize="h5"
              fontWeight="bold"
              color={themes.Color.grayScale[60]}
            >
              파일을 불러올 수 없습니다.
            </Text>
          </Stack>
        ) : (
          <PDF src={file} type="application/pdf" />
        )}
      </Stack>
    </>
  );
};

const PDF = styled.embed`
  width: 100vw;
  height: calc(100vh - 70px);
`;
