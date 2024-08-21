import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAxios, ErrorResponseType, sleep } from "@shared";

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
  (
    {
      easyQuestionsCount,
      mediumQuestionsCount,
      hardQuestionsCount,
    }: GetQuestionsType,
    thunkApi
  ) => {
    try {
      const requests = [
        sleep(0).then(() =>
          baseAxios.get<IResponse>(
            `/api.php?amount=${easyQuestionsCount}&difficulty=easy`
          )
        ),
        sleep(5000).then(() =>
          baseAxios.get<IResponse>(
            `/api.php?amount=${mediumQuestionsCount}&difficulty=medium`
          )
        ),
        sleep(10000).then(() =>
          baseAxios.get<IResponse>(
            `/api.php?amount=${hardQuestionsCount}&difficulty=hard`
          )
        ),
      ];

      return Promise.all(requests);
    } catch (error) {
      return thunkApi.rejectWithValue(error as ErrorResponseType);
    }
  }
);
