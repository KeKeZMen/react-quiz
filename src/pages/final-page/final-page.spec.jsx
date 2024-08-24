import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { renderWithRedux } from "@tests";
import { Finalpage } from "./ui";
import { useAppSelector } from "@shared";
import userEvent from "@testing-library/user-event";

vi.mock("@shared", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAppSelector: vi.fn(),
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

describe("Тестирования страницы Finalpage", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("Тестирование корректного отображения, когда все вопросы отвечены верно", () => {
    useAppSelector.mockReturnValue({
      answeredQuestions: [
        {
          type: "multiple",
          difficulty: "medium",
          category: "Politics",
          question:
            "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
          correct_answer: ["Ronald Reagan"],
          incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
          id: "1",
          selectedAnswers: ["Ronald Reagan"],
          isAnswered: true,
        },
        {
          type: "boolean",
          difficulty: "easy",
          category: "Entertainment: Video Games",
          question:
            "The end credits sequence in Grand Theft Auto 5 is over half an hour long.",
          correct_answer: ["True"],
          incorrect_answers: ["False"],
          selectedAnswers: ["True"],
          isAnswered: true,
        },
        {
          type: "boolean",
          difficulty: "hard",
          category: "Entertainment: Video Games",
          question:
            "In the Monster Hunter Series, it is possible to capture Elder Dragons.",
          correct_answer: ["False"],
          incorrect_answers: ["True"],
          id: "3",
          selectedAnswers: ["False"],
          isAnswered: true,
        },
      ],
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
            "The end credits sequence in Grand Theft Auto 5 is over half an hour long.",
          correct_answer: ["True"],
          incorrect_answers: ["False"],
          id: "2",
        },
        {
          type: "boolean",
          difficulty: "hard",
          category: "Entertainment: Video Games",
          question:
            "In the Monster Hunter Series, it is possible to capture Elder Dragons.",
          correct_answer: ["False"],
          incorrect_answers: ["True"],
          id: "3",
        },
      ],
    });

    const { getByTestId, getAllByTestId } = renderWithRedux(<Finalpage />, {
      initialEntries: "/1",
    });

    expect(getByTestId("answered-title").innerHTML).toBe("Congratulations");

    expect(getAllByTestId("question").length).toBe(3);

    expect(getAllByTestId("answered-question").length).toBe(3);

    expect(
      getByTestId("answered-block").classList.contains("text-green-400")
    ).toBe(true);

    expect(
      getByTestId("answered-easy").classList.contains("bg-green-600")
    ).toBe(true);

    expect(
      getByTestId("answered-medium").classList.contains("bg-green-600")
    ).toBe(true);

    expect(
      getByTestId("answered-hard").classList.contains("bg-green-600")
    ).toBe(true);

    expect(getByTestId("repeat")).toBeDefined();
  });

  test("Тестирование корректного отображения, когда не все вопросы отвечены верно", () => {
    useAppSelector.mockReturnValue({
      answeredQuestions: [
        {
          type: "multiple",
          difficulty: "medium",
          category: "Politics",
          question:
            "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
          correct_answer: ["Ronald Reagan"],
          incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
          id: "1",
          selectedAnswers: ["Ronald Reagan"],
          isAnswered: false,
        },
        {
          type: "boolean",
          difficulty: "easy",
          category: "Entertainment: Video Games",
          question:
            "The end credits sequence in Grand Theft Auto 5 is over half an hour long.",
          correct_answer: ["True"],
          incorrect_answers: ["False"],
          selectedAnswers: ["True"],
          isAnswered: false,
        },
        {
          type: "boolean",
          difficulty: "hard",
          category: "Entertainment: Video Games",
          question:
            "In the Monster Hunter Series, it is possible to capture Elder Dragons.",
          correct_answer: ["False"],
          incorrect_answers: ["True"],
          id: "3",
          selectedAnswers: ["False"],
          isAnswered: true,
        },
      ],
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
            "The end credits sequence in Grand Theft Auto 5 is over half an hour long.",
          correct_answer: ["True"],
          incorrect_answers: ["False"],
          id: "2",
        },
        {
          type: "boolean",
          difficulty: "hard",
          category: "Entertainment: Video Games",
          question:
            "In the Monster Hunter Series, it is possible to capture Elder Dragons.",
          correct_answer: ["False"],
          incorrect_answers: ["True"],
          id: "3",
        },
      ],
    });

    const { getByTestId, getAllByTestId } = renderWithRedux(<Finalpage />, {
      initialEntries: "/1",
    });

    expect(getByTestId("answered-title").innerHTML).toBe("Try harder");

    expect(getAllByTestId("question").length).toBe(3);

    expect(getAllByTestId("answered-question").length).toBe(3);

    expect(
      getByTestId("answered-block").classList.contains("text-red-400")
    ).toBe(true);

    expect(getByTestId("answered-easy").classList.contains("bg-red-600")).toBe(
      true
    );

    expect(
      getByTestId("answered-medium").classList.contains("bg-red-600")
    ).toBe(true);

    expect(
      getByTestId("answered-hard").classList.contains("bg-green-600")
    ).toBe(true);

    expect(getByTestId("repeat")).toBeDefined();
  });

  test("Тестирование повтора теста", async () => {
    useAppSelector.mockReturnValue({
      answeredQuestions: [
        {
          type: "multiple",
          difficulty: "medium",
          category: "Politics",
          question:
            "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
          correct_answer: ["Ronald Reagan"],
          incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
          id: "1",
          selectedAnswers: ["Ronald Reagan"],
          isAnswered: true,
        },
        {
          type: "boolean",
          difficulty: "easy",
          category: "Entertainment: Video Games",
          question:
            "The end credits sequence in Grand Theft Auto 5 is over half an hour long.",
          correct_answer: ["True"],
          incorrect_answers: ["False"],
          selectedAnswers: ["True"],
          isAnswered: true,
        },
        {
          type: "boolean",
          difficulty: "hard",
          category: "Entertainment: Video Games",
          question:
            "In the Monster Hunter Series, it is possible to capture Elder Dragons.",
          correct_answer: ["False"],
          incorrect_answers: ["True"],
          id: "3",
          selectedAnswers: ["False"],
          isAnswered: true,
        },
      ],
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
            "The end credits sequence in Grand Theft Auto 5 is over half an hour long.",
          correct_answer: ["True"],
          incorrect_answers: ["False"],
          id: "2",
        },
        {
          type: "boolean",
          difficulty: "hard",
          category: "Entertainment: Video Games",
          question:
            "In the Monster Hunter Series, it is possible to capture Elder Dragons.",
          correct_answer: ["False"],
          incorrect_answers: ["True"],
          id: "3",
        },
      ],
    });

    const { getByTestId } = renderWithRedux(<Finalpage />, {
      initialEntries: "/1",
    });

    await userEvent.click(getByTestId("repeat"));

    expect(navigate).toBeCalledTimes(1);
  });
});
