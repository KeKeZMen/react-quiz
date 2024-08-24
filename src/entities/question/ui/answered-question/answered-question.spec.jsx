import { cleanup } from "@testing-library/react";
import { renderWithRedux } from "@tests";
import { afterEach, describe, expect, test } from "vitest";
import { AnsweredQuestion } from "./ui";

describe("Тестирование компонента AnsweredQuestion", () => {
  afterEach(cleanup);

  const mockAnsweredQuestion = {
    type: "multiple",
    selectedAnswers: ["Ronald Reagan"],
    isAnswered: true,
    difficulty: "medium",
    category: "Politics",
    question:
      "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
    correct_answer: ["Ronald Reagan"],
    incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
    id: "1",
  };

  const mockUnansweredQuestion = {
    type: "multiple",
    selectedAnswers: ["Richard Nixon"],
    isAnswered: false,
    difficulty: "medium",
    category: "Politics",
    question:
      "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
    correct_answer: ["Ronald Reagan"],
    incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
    id: "1",
  };

  test("Тестирование корректнного отображения верно отвеченного вопроса", () => {
    const { getByTestId, getAllByTestId } = renderWithRedux(
      <AnsweredQuestion question={mockAnsweredQuestion} />,
      { initialEntries: "/final" }
    );

    expect(
      getByTestId("answered-question").classList.contains("bg-green-600")
    ).toBe(true);

    expect(getByTestId("question").innerHTML).toBe(
      mockAnsweredQuestion.question
    );

    expect(getAllByTestId("selected-answers").length).toBe(1);

    expect(getAllByTestId("selected-answers").map((p) => p.innerHTML)).toEqual(
      mockAnsweredQuestion.correct_answer
    );
  });

  test("Тестирование корректного отображения неверно отвеченнного вопроса", () => {
    const { getByTestId, getAllByTestId } = renderWithRedux(
      <AnsweredQuestion question={mockUnansweredQuestion} />,
      { initialEntries: "/final" }
    );

    expect(
      getByTestId("answered-question").classList.contains("bg-red-600")
    ).toBe(true);

    expect(getByTestId("question").innerHTML).toBe(
      mockUnansweredQuestion.question
    );

    expect(getAllByTestId("selected-answers").length).toBe(1);

    expect(
      getAllByTestId("selected-answers").map((p) => p.innerHTML)
    ).not.toEqual(mockUnansweredQuestion.correct_answer);
  });
});
