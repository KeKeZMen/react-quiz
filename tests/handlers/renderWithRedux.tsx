import { render } from "@testing-library/react";
import * as shared from "@shared";
import { makeStore } from "@app/store";
import { InitialStateType } from "@entities/question";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

export const renderWithRedux = (
  component: JSX.Element,
  config: {
    initialState?: Partial<{
      questions: InitialStateType | undefined;
    }>;
    initialEntries: string;
  }
) => {
  const store = makeStore({
    questions: config.initialState?.questions,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[config.initialEntries]}>
        <shared.Toaster />
        {component}
      </MemoryRouter>
    </Provider>
  );
};
