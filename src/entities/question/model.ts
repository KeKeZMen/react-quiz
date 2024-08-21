import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getQuestions, IQuestionWithId, IStoredQuestionWithId } from "./api";
import { ErrorResponseType } from "@shared";

type InitialStateType = {
  isLoading: boolean;
  isError: boolean;
  error: ErrorResponseType | null;
  questions: IQuestionWithId[];
  answeredQuestions: IStoredQuestionWithId[];
};

const initialState: InitialStateType = {
  isLoading: false,
  isError: false,
  error: null,
  questions: [],
  answeredQuestions: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    answerQuestion(state, action: PayloadAction<IStoredQuestionWithId>) {
      state.answeredQuestions.push(action.payload);
    },
    resetQuestions(state) {
      state.answeredQuestions = [];
      state.questions = [];
    },
    resetError(state) {
      state.isError = false;
      state.error = null;
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
      state.questions = action.payload;
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload as ErrorResponseType;
      state.questions = [];
    });
  },
});

export const { answerQuestion, resetQuestions } = questionsSlice.actions;
