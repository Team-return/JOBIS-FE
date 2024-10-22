import React from "react";
import { Text, Flex } from "@jobis/ui";
import Image from "next/image";
import BlueStar from "../../../public/blueStar.svg";
import { IInputTemplate } from "./types";

export const InputTemplate = ({
  title,
  required = false,
  children,
}: IInputTemplate) => {
  return (
    <Flex style={{ justifyContent: "space-between", width: "100%" }}>
      <Flex style={{ marginRight: "auto" }}>
        <Text fontSize="body2" fontWeight="regular">
          {title}
        </Text>
        {required && <Image src={BlueStar} width={10} height={10} alt="star" />}
      </Flex>
      {children}
    </Flex>
  );
};
