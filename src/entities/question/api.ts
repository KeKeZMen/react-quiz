import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseAxios, decodeHtml, ErrorResponseType, sleep } from "@shared";

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

      return Promise.all(requests).then((responses) =>
        responses.flatMap((obj) =>
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
        )
      );
    } catch (error) {
      return thunkApi.rejectWithValue(error as ErrorResponseType);
    }
  }
);
