import { useModal } from "@/stores";
import { themes } from "@jobis/design-token";
import { Text } from "@jobis/ui";
import { BigButton, Input, Stack, ReviewBox } from "@/components";
import { styled } from "styled-components";
import { ReviewTitleCellData } from "@/constants";
import { useGetReviewDetail, useGetReviews } from "@/apis";
import { useState } from "react";
import { ReviewStudentRow } from "@/components/modal/reviewModal";

type PropsType = {
  id: number;
};

export const ReviewModal = ({ id }: PropsType) => {
  const { closeModal } = useModal();
  const [search, setSearch] = useState<string>("");

  const { data: reviewsData } = useGetReviews(id);
  const [selectId, setSelectId] = useState<string>("");

  const { data: reviewDetailData } = useGetReviewDetail(selectId);

  const selectStudent = reviewsData?.reviews.find(
    item => item.review_id === selectId
  );

  return (
    <Stack
      position="relative"
      direction="column"
      width={382}
      gap={8}
      style={{ padding: "8px" }}
    >
      <Input
        width="100%"
        placeholder="이름을 검색하세요."
        isSearch={true}
        value={search}
        onChange={e => {
          setSearch(e.target.value);
        }}
      />
      <TitleWrapper>
        {ReviewTitleCellData.map((item, idx) => (
          <Stack key={idx} width={item.width} justify="center" align="center">
            <Text
              fontSize="body3"
              fontWeight="medium"
              color={themes.Color.grayScale[60]}
            >
              {item.title}
            </Text>
          </Stack>
        ))}
      </TitleWrapper>
      <Stack direction="column" gap={10} margin="0 0 28px 0">
        {reviewsData?.reviews
          .filter(item => item.writer.includes(search))
          .map((item, idx) => (
            <ReviewStudentRow
              item={item}
              key={idx}
              setSelectId={setSelectId}
              selectId={selectId}
            />
          ))}
      </Stack>
      <Text fontSize="body2" fontWeight="bold">
        {selectStudent?.writer || "OOO"}님의 후기
      </Text>
      <Stack
        direction="column"
        gap={10}
        overflow="scroll"
        style={{ minHeight: "124px", maxHeight: "250px" }}
      >
        {selectId ? (
          reviewDetailData?.qna_responses.map((qna, idx) => (
            <ReviewBox key={idx} item={qna} />
          ))
        ) : (
          <Stack height={124} justify="center" align="center">
            <Text
              fontSize="body3"
              fontWeight="regular"
              color={themes.Color.grayScale[60]}
            >
              아직 학생을 선택하지 않았습니다.
            </Text>
          </Stack>
        )}
      </Stack>
      <CancleBtn variant="primary" width={122} height={48} onClick={closeModal}>
        <Text fontSize="body2" fontWeight="bold">
          닫기
        </Text>
      </CancleBtn>
    </Stack>
  );
};

const CancleBtn = styled(BigButton)`
  position: absolute;
  right: -24px;
  bottom: -100px;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  margin: 28px 0 0;
  border-bottom: 1px solid ${themes.Color.grayScale[40]};

  color: ${themes.Color.grayScale[60]};
  font-size: ${themes.Font.body2};
  font-weight: ${themes.FontWeight.medium};
`;
