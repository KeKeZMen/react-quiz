import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithDelay, decodeHtml, ErrorResponseType } from "@shared";

export interface IQuestion {
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string[];
  incorrect_answers: string[];
}

export interface IQuestionWithId extends IQuestion {
  id: string;
}

export interface IStoredQuestionWithId extends IQuestionWithId {
  selectedAnswers: string[];
  isAnswered: boolean;
}

export interface IResponse {
  response_code: number;
  results: IQuestion[];
}

type GetQuestionsType = {
  easyQuestionsCount: number;
  mediumQuestionsCount: number;
  hardQuestionsCount: number;
};

export const getQuestions = createAsyncThunk(
  "getQuestions",
  async (
    {
      easyQuestionsCount,
      mediumQuestionsCount,
      hardQuestionsCount,
    }: GetQuestionsType,
    thunkApi
  ) => {
    const urls = [
      {
        url: `/api.php?amount=${easyQuestionsCount}&difficulty=easy`,
        delay: 0,
      },
      {
        url: `/api.php?amount=${mediumQuestionsCount}&difficulty=medium`,
        delay: 5000,
      },
      {
        url: `/api.php?amount=${hardQuestionsCount}&difficulty=hard`,
        delay: 5000,
      },
    ];

    const data = [];

    for (const { delay, url } of urls) {
      try {
        const res = await axiosWithDelay<IResponse>(
          { url, method: "GET" },
          delay
        );
        data.push(res);
      } catch (err) {
        const { data, status } = err as ErrorResponseType;
        return thunkApi.rejectWithValue({ data, status });
      }
    }

    return data.flatMap((obj) =>
      obj.data.results.map(
        (question) =>
          ({
            ...question,
            question: decodeHtml(question.question),
            incorrect_answers: question.incorrect_answers.map(decodeHtml),
            correct_answer: Array.isArray(question.correct_answer)
              ? question.correct_answer.map(decodeHtml)
              : [decodeHtml(question.correct_answer)],
            id: String(Math.floor(Math.random() * 1000000)),
          } as IQuestionWithId)
      )
    );
  }
);
