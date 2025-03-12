import { useTeacherRecruitmentList } from "@/apis";
import { AddStudentRow, Loading } from "@/components";
import { AddStudentCellData } from "@/constants";
import { themes } from "@jobis/design-token";
import { styled } from "styled-components";

export const AddStudent = () => {
  const { data, isPending, isRefetching } = useTeacherRecruitmentList();

  return (
    <Container>
      <TableHeading>{AddStudentCellData[0].title}</TableHeading>
      {isPending || isRefetching ? (
        <Loading />
      ) : (
        data?.recruitments.map((company, index) => (
          <AddStudentRow key={index} data={company} />
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 182px;
`;

const TableHeading = styled.div`
  width: 100%;
  height: 40px;
  padding-left: 58px;
  border-bottom: 1px solid ${themes.Color.grayScale[40]};

  color: ${themes.Color.grayScale[60]};
`;
