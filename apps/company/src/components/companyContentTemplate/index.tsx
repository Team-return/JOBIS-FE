import * as S from "./style";

interface PropType {
  title: string;
  content?: string | number;
}

export const CompanyContentTemplate = ({ title, content }: PropType) => {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.Content>{content}</S.Content>
    </S.Wrapper>
  );
};
