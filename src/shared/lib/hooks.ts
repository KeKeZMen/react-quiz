import { IQuestionWithId } from "@entities/question";
import { shufleQuestionsArray } from "./utils";
import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/store";

export const useGetAnswers = (question: IQuestionWithId) => {
  if (question.type === "boolean") {
    return [...question.correct_answer, ...question.incorrect_answers].sort();
  } else {
    return useMemo(
      () =>
        shufleQuestionsArray([
          ...question.incorrect_answers,
          ...question.correct_answer,
        ]),
      [question]
    );
  }
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
