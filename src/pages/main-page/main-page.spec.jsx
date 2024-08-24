import { renderWithRedux } from "@tests";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Mainpage } from "./ui";
import userEvent from "@testing-library/user-event";
import { cleanup } from "@testing-library/react";
import { axiosWithDelay } from "@shared";

vi.mock("@shared", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    axiosWithDelay: vi.fn(),
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

describe("Тестирование компонента Mainpage", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("Тестирование корректного отображения", () => {
    const { getByTestId } = renderWithRedux(<Mainpage />, {
      initialEntries: "/",
    });

    expect(getByTestId("easy-count")).toBeDefined();
    expect(getByTestId("medium-count")).toBeDefined();
    expect(getByTestId("hard-count")).toBeDefined();
    expect(getByTestId("load-button")).toBeDefined();
  });

  test("Тестирование ошибки при загрузке вопросов из-за большого количества запросов", async () => {
    axiosWithDelay.mockRejectedValue({ status: 429 });

    const { getByTestId } = renderWithRedux(<Mainpage />, {
      initialEntries: "/",
    });

    await userEvent.type(getByTestId("easy-count"), "3");
    await userEvent.type(getByTestId("medium-count"), "2");
    await userEvent.type(getByTestId("hard-count"), "1");

    await userEvent.click(getByTestId("load-button"));

    expect(axiosWithDelay).toBeCalledTimes(1);
    expect(getByTestId("toast-message").innerHTML).toBe(
      "To many requests, try later"
    );
  });

  test("Тестирование ошибки при загрузке вопросов из-за ошибки сервера", async () => {
    axiosWithDelay.mockRejectedValue({ status: 403 });

    const { getByTestId } = renderWithRedux(<Mainpage />, {
      initialEntries: "/",
    });

    await userEvent.type(getByTestId("easy-count"), "3");
    await userEvent.type(getByTestId("medium-count"), "2");
    await userEvent.type(getByTestId("hard-count"), "1");

    await userEvent.click(getByTestId("load-button"));

    expect(axiosWithDelay).toBeCalledTimes(1);
    expect(getByTestId("toast-message").innerHTML).toBe("Error");
  });

  test("Тестирование страницы при успешном запросе", async () => {
    axiosWithDelay.mockResolvedValueOnce({
      type: "multiple",
      difficulty: "medium",
      category: "Politics",
      question:
        "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
      correct_answer: ["Ronald Reagan"],
      incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
      id: "1",
    });

    axiosWithDelay.mockResolvedValueOnce({
      type: "multiple",
      difficulty: "medium",
      category: "Politics",
      question:
        "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
      correct_answer: ["Ronald Reagan"],
      incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
      id: "2",
    });

    axiosWithDelay.mockResolvedValueOnce({
      type: "multiple",
      difficulty: "medium",
      category: "Politics",
      question:
        "Which former US president used 'Let`s Make America Great Again' as his campaign slogan before Donald Trump`s campaign?",
      correct_answer: ["Ronald Reagan"],
      incorrect_answers: ["Jimmy Carter", "Gerald Ford", "Richard Nixon"],
      id: "3",
    });

    const { getByTestId } = renderWithRedux(<Mainpage />, {
      initialEntries: "/",
    });

    await userEvent.type(getByTestId("easy-count"), "3");
    await userEvent.type(getByTestId("medium-count"), "2");
    await userEvent.type(getByTestId("hard-count"), "1");

    await userEvent.click(getByTestId("load-button"));

    expect(axiosWithDelay).toBeCalledTimes(3);
  });
});
