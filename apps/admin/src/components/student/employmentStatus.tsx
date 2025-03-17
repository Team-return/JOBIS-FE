import { useState } from "react";
import { BigButton, Stack } from "@/components";
import { styled } from "styled-components";
import { AddStudent, EmploymentCurrentSituation } from "@/components";
import { useNavigate } from "react-router-dom";

export const EmploymentStatus = () => {
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useState(true);

  return (
    <Stack direction="column" gap={isAdd ? 28 : 36}>
      <Stack justify="flex-end" gap={8}>
        <BigButton
          width={74}
          variant={isAdd ? "primary" : "solid"}
          onClick={() => setIsAdd(!isAdd)}
        >
          학생 추가
        </BigButton>
        <BigButton width={90} onClick={() => navigate("/company-register")}>
          기업 추가 +
        </BigButton>
      </Stack>
      {isAdd ? <AddStudent /> : <EmploymentCurrentSituation />}
    </Stack>
  );
};
