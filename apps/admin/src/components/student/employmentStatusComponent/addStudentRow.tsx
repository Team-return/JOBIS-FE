import type { TeacherRecruitmentType } from "@/apis";
import { Stack } from "@/components";
import { Text, Icon } from "@jobis/ui";
import { themes } from "@jobis/design-token";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { AddStudentCellData } from "@/constants";

type PropsType = {
  data: TeacherRecruitmentType;
};

export const AddStudentRow = ({ data }: PropsType) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/student-register/${data.id}`);
  };

  return (
    <Container position="relative" align="center" justify="flex-start">
      <Stack gap={12}>
        <Profile src={data.company_logo_url} />
        <StyleText
          $width={AddStudentCellData[0].width}
          fontSize="body2"
          fontWeight="regular"
        >
          {data.company_name}
        </StyleText>
      </Stack>
      <IconButton
        icon="Plus"
        color={themes.Color.grayScale[60]}
        onClick={clickHandler}
      />
    </Container>
  );
};

const Container = styled(Stack)`
  border-bottom: 1px solid ${themes.Color.grayScale[40]};
`;

const StyleText = styled(Text)<{
  $width: string;
}>`
  display: flex;
  justify-content: start;
  align-items: center;
  width: ${({ $width }) => $width};
  height: 88px;
  padding: 0 10px;

  color: ${themes.Color.grayScale[60]};
  text-align: center;

  word-break: keep-all;
`;

const IconButton = styled(Icon)`
  cursor: pointer;

  width: 28px;
  height: 28px;
  border-radius: 4px;

  background-color: ${themes.Color.grayScale[30]};
`;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`;
