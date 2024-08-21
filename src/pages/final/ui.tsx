import { AnsweredQuestion, resetQuestions } from "@entities/question";
import { Button, useAppDispatch, useAppSelector } from "@shared";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const Finalpage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { answeredQuestions, questions } = useAppSelector(
    (state) => state.questions
  );

  const moreHalfAnswered =
    answeredQuestions.filter((question) => question.isAnswered).length >
    questions.length / 2;

  const answeredPercentage = Math.floor(
    (answeredQuestions.filter((q) => q.isAnswered).length / questions.length) *
      100
  );

  const moreHalfEasyAnswered =
    answeredQuestions.filter((q) => q.isAnswered && q.difficulty === "easy")
      .length >
    questions.filter((q) => q.difficulty === "easy").length / 2;
  const easyAnsweredPercentage = Math.floor(
    (answeredQuestions.filter((q) => q.isAnswered && q.difficulty === "easy")
      .length /
      questions.filter((q) => q.difficulty === "easy").length) *
      100
  );

  const moreHalfMediumAnswered =
    answeredQuestions.filter((q) => q.isAnswered && q.difficulty === "medium")
      .length >
    questions.filter((q) => q.difficulty === "medium").length / 2;
  const mediumAnsweredPercentage = Math.floor(
    (answeredQuestions.filter((q) => q.isAnswered && q.difficulty === "medium")
      .length /
      questions.filter((q) => q.difficulty === "medium").length) *
      100
  );

  const moreHalfHardAnswered =
    answeredQuestions.filter((q) => q.isAnswered && q.difficulty === "hard")
      .length >
    questions.filter((q) => q.difficulty === "hard").length / 2;
  const hardAnsweredPercentage = Math.floor(
    (answeredQuestions.filter((q) => q.isAnswered && q.difficulty === "hard")
      .length /
      questions.filter((q) => q.difficulty === "hard").length) *
      100
  );

  const handleReset = () => {
    dispatch(resetQuestions());
    return navigate("/");
  };

  return (
    <div className="flex flex-col py-3 items-center gap-3">
      <div
        className={clsx(
          "text-2xl text-center",
          moreHalfAnswered ? "text-green-400" : "text-red-400"
        )}
      >
      <h1 className="uppercase">{moreHalfAnswered ? "Congratulations" : "Try harder"}</h1>

      <h2>Your persentage of answered questions: {answeredPercentage}%</h2>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-3 md:items-start">
          <div className="flex flex-col items-center gap-3">
            <div
              className={clsx(
                "text-center rounded-md p-3 shadow-md text-white w-[100px]",
                moreHalfEasyAnswered ? "bg-green-600" : "bg-red-600"
              )}
            >
              <h3>Easy</h3>
              <p>{easyAnsweredPercentage}%</p>
            </div>

            <div className="flex flex-col gap-3 items-center px-3 flex-wrap md:flex-nowrap">
              {answeredQuestions
                .filter((q) => q.difficulty === "easy")
                .map((question) => (
                  <AnsweredQuestion question={question} key={question.id} />
                ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div
              className={clsx(
                "text-center rounded-md p-3 shadow-md text-white w-[100px]",
                moreHalfMediumAnswered ? "bg-green-600" : "bg-red-600"
              )}
            >
              <h3>Medium</h3>
              <p>{mediumAnsweredPercentage}%</p>
            </div>

            <div className="flex flex-col gap-3 items-center px-3 flex-wrap md:flex-nowrap">
              {answeredQuestions
                .filter((q) => q.difficulty === "medium")
                .map((question) => (
                  <AnsweredQuestion question={question} key={question.id} />
                ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div
              className={clsx(
                "text-center rounded-md p-3 shadow-md text-white w-[100px]",
                moreHalfHardAnswered ? "bg-green-600" : "bg-red-600"
              )}
            >
              <h3>Hard</h3>
              <p>{hardAnsweredPercentage}%</p>
            </div>

            <div className="flex flex-col gap-3 items-center px-3 flex-wrap md:flex-nowrap">
              {answeredQuestions
                .filter((q) => q.difficulty === "hard")
                .map((question) => (
                  <AnsweredQuestion question={question} key={question.id} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleReset} className="bg-slate-500 uppercase text-2xl p-6">
        Repeat test
      </Button>
    </div>
  );
};
