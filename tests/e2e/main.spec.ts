import { test, expect } from "@playwright/test";

test("Начать и закончить игру", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const easyQuestionCount = "3";
  const mediumQuestionCount = "2";
  const hardQuestionCount = "1";

  const questionsCount =
    Number(easyQuestionCount) +
    Number(mediumQuestionCount) +
    Number(hardQuestionCount);

  await expect(page.getByTestId("easy-count-input")).toBeVisible();
  await page.getByTestId("easy-count-input").fill(easyQuestionCount);

  await expect(page.getByTestId("medium-count-input")).toBeVisible();
  await page.getByTestId("medium-count-input").fill(mediumQuestionCount);

  await expect(page.getByTestId("hard-count-input")).toBeVisible();
  await page.getByTestId("hard-count-input").fill(hardQuestionCount);

  await expect(page.getByTestId("load-button")).toBeVisible();

  await page.getByTestId("load-button").click();
  expect(await page.getByTestId("load-button").innerHTML()).toBe("Loading...");
  let isError = await page.getByTestId("toast").isVisible();

  while (isError) {
    await page.getByTestId("load-button").click();
    isError = await page.getByTestId("toast").isVisible();
  } // из-за нестабильности api приходится ожидать, когда все вопросы подгрузятся

  await page.waitForURL(/\/\d+/);

  for (let i = 1; i <= questionsCount; i++) {
    await expect(page.getByTestId("question")).toBeVisible();
    expect(await page.getByTestId("answer").count()).toBeGreaterThan(1);
    await page.getByTestId("answer").last().click();
    await expect(page.getByTestId("answer-button")).toBeVisible();
    await page.getByTestId("answer-button").click();
  }

  await expect(page.getByTestId("answered-block")).toBeVisible();

  await expect(page.getByTestId("repeat")).toBeVisible();
  await page.getByTestId("repeat").click();

  await expect(page.getByTestId("easy-count")).toBeVisible();
});
