import { renderWithRedux } from "@tests";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Question } from "./ui";
import UserEvent from "@testing-library/user-event";
import { cleanup } from "@testing-library/react";

vi.mock("@shared", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  };
});

const navigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("Тестирование компонента Question", () => {
  afterEach(cleanup);

  const mockMultipleQuestion = {
    type: "multiple",
    difficulty: "medium",
    category: "Politics",
    question:
      "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
    correct_answer: ["Ronald Reagan"],
    incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
    id: "1",
  };

  const mockBooleanQuestion = {
    type: "boolean",
    difficulty: "easy",
    category: "Entertainment: Video Games",
    question:
      "In the Monster Hunter Series, it is possible to capture Elder Dragons.",
    correct_answer: ["False"],
    incorrect_answers: ["True"],
    id: "1",
  };

  const initialQuestionState = {
    answeredQuestions: [],
    error: null,
    isError: false,
    isLoading: false,
    questions: [
      {
        type: "multiple",
        difficulty: "medium",
        category: "Politics",
        question:
          "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
        correct_answer: ["Ronald Reagan"],
        incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
        id: "1",
      },
      {
        type: "boolean",
        difficulty: "easy",
        category: "Entertainment: Video Games",
        question:
          "In the Monster Hunter Series, it is possible to capture Elder Dragons.",
        correct_answer: ["False"],
        incorrect_answers: ["True"],
        id: "2",
      },
    ],
  };

  test("Тестирование корректного отображения boolean вопроса", () => {
    const { getByTestId, getAllByTestId } = renderWithRedux(
      <Question question={mockBooleanQuestion} />,
      {
        initialEntries: "/1",
        initialState: {
          questions: initialQuestionState,
        },
      }
    );

    expect(getByTestId("question").innerHTML).toBe(
      "In the Monster Hunter Series, it is possible to capture Elder Dragons."
    );

    expect(getAllByTestId("answer").length).toBe(2);

    expect(getByTestId("answer-button")).toBeDefined();
  });

  test("Тестирование корректного отображения multiple вопроса", () => {
    const { getByTestId, getAllByTestId } = renderWithRedux(
      <Question question={mockMultipleQuestion} />,
      {
        initialEntries: "/1",
        initialState: {
          questions: initialQuestionState,
        },
      }
    );

    expect(getByTestId("question").innerHTML).toBe(
      "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?"
    );

    expect(getAllByTestId("answer").length).toBe(4);

    expect(getByTestId("answer-button")).toBeDefined();
  });

  test("Тестирование ответа и редиректа", async () => {
    const { getByText, getByTestId } = renderWithRedux(
      <Question question={mockMultipleQuestion} />,
      {
        initialEntries: "/1",
        initialState: {
          questions: initialQuestionState,
        },
      }
    );

    expect(getByTestId("question").innerHTML).toBe(
      "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?"
    );

    await UserEvent.click(getByText("Answer"));

    expect(getByTestId("toast")).toBeDefined();

    await UserEvent.click(getByText("Ronald Reagan"));

    await UserEvent.click(getByText("Answer"));

    expect(navigate).toHaveBeenCalledWith("/2");
  });
});
