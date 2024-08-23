import { InitialStateType, questionsSlice } from "@entities/question";
import { combineReducers, configureStore } from "@reduxjs/toolkit/react";

export const rootReducer = combineReducers({
  [questionsSlice.name]: questionsSlice.reducer,
});

export const makeStore = (
  initialState?: Partial<{
    questions: InitialStateType | undefined;
  }>
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (gDM) => gDM().concat(),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
