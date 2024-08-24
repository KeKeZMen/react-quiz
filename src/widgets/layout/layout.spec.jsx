import { cleanup } from "@testing-library/react";
import { renderWithRedux } from "@tests";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Layout } from "./ui";

const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("Тестирование компонента Layout", () => {
  afterEach(cleanup);

  const initialEmptyQuestionState = {
    answeredQuestions: [],
    error: null,
    isError: false,
    isLoading: false,
    questions: [],
  };

  test("Тестирование при пустом массиве вопросов", () => {
    renderWithRedux(<Layout />, {
      initialState: { questions: initialEmptyQuestionState },
      initialEntries: "/1",
    });

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
