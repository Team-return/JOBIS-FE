"use client";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IHiringProgress } from "@/apis/recruitments/types";
import dndIcon from "../../../../public/dndIcon.svg";
import Image from "next/image";
import { hiringProgressType } from "@/utils/translate";
import selectIcon from "../../../../public/selectIcon.svg";
import { useModal } from "@/hooks/useModal";
import { Flex, Button, Text } from "@jobis/ui";
import * as S from "./style";
import { themes } from "@jobis/design-token";

interface PropsType {
  hiringProgressArray: IHiringProgress[];
  setRecruitmentFormDetailInfo: Dispatch<SetStateAction<IHiringProgress[]>>;
}

const ProgressModal = ({
  hiringProgressArray,
  setRecruitmentFormDetailInfo,
}: PropsType) => {
  const [state, setState] = useState<IHiringProgress[]>([]);

  const { closeModal } = useModal();
  const progressList = Object.entries(hiringProgressType);

  const handleChange = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const items = [...state];
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setState(items);
  };

  const clickHiringProgress = (progress: IHiringProgress) => {
    if (state?.includes(progress)) {
      // progress 삭제
      setState(state?.filter(progressType => progressType !== progress));
    } else {
      // progress 추가
      setState([...state, progress]);
    }
  };

  const confirmProgress = async () => {
    setRecruitmentFormDetailInfo(state);
    closeModal();
  };

  useEffect(() => {
    setState(hiringProgressArray);
  }, [hiringProgressArray]);

  return (
    <S.Container>
      <Flex direction="column" width={300}>
        <S.Title>채용 방법</S.Title>
        <S.DndWrapper>
          <DragDropContext onDragEnd={handleChange}>
            <Droppable droppableId="progress">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {state?.map((progress, idx) => {
                    return (
                      <Draggable
                        key={idx}
                        draggableId={String(idx)}
                        index={idx}
                      >
                        {provide => (
                          <S.DndItemWrapper
                            ref={provide.innerRef}
                            {...provide.draggableProps}
                            {...provide.dragHandleProps}
                          >
                            <Image src={dndIcon} alt="" />
                            <Text
                              as="p"
                              fontSize="body3"
                              fontWeight="medium"
                              color={themes.Color.grayScale[60]}
                            >{`${idx + 1}. ${hiringProgressType[progress as IHiringProgress]}`}</Text>
                          </S.DndItemWrapper>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </S.DndWrapper>
      </Flex>
      <S.ProgressWrapper>
        <S.ProgressListWrapper>
          {progressList.map((progress, i) => {
            const [progressType, progressName] = progress;
            return (
              <S.Card
                key={i}
                onClick={() => {
                  clickHiringProgress(progressType as IHiringProgress);
                }}
                isSelect={state?.includes(progressType as IHiringProgress)}
              >
                {progressName}
                {state?.includes(progressType as IHiringProgress) && (
                  <S.SelectIconImg
                    width={18}
                    height={18}
                    src={selectIcon}
                    alt="icon"
                  />
                )}
              </S.Card>
            );
          })}
        </S.ProgressListWrapper>
        <Flex direction="column" style={{ width: "100%" }}>
          <Button onClick={confirmProgress}>확인</Button>
        </Flex>
      </S.ProgressWrapper>
    </S.Container>
  );
};

export default ProgressModal;
