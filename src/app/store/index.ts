import { questionsSlice } from "@entities/question";
import { combineReducers, configureStore } from "@reduxjs/toolkit/react";

const rootReducer = combineReducers({
  [questionsSlice.name]: questionsSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
