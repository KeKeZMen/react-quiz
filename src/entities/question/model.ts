import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuestions, IQuestionWithId } from "./api";

type InitialStateType = {
  isLoading: boolean;
  isError: boolean;
  questions: IQuestionWithId[];
  answeredQuestions: IQuestionWithId[];
};

const initialState: InitialStateType = {
  isLoading: false,
  isError: false,
  questions: [],
  answeredQuestions: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    answerQuestion(state, action: PayloadAction<IQuestionWithId>) {
      state.answeredQuestions.push(action.payload);
      state.questions = state.questions.filter(question => question.id !== action.payload.id);
    },
  },
  extraReducers(builder) {
    builder.addCase(getQuestions.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.questions = action.payload.reduce(
        (acc, val) =>
          acc.concat(
            ...val.data.results.map((question) => ({
              ...question,
              id: String(Math.floor(Math.random() * 1000000)),
            }))
          ),
        [] as IQuestionWithId[]
      );
    });
    builder.addCase(getQuestions.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.questions = [];
    });
  },
});
