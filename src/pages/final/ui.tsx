import { AnsweredQuestion, resetQuestions } from "@entities/question";
import { Button, useAppDispatch, useAppSelector } from "@shared";
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
      {moreHalfAnswered ? <h1>Congratulations</h1> : <h1>Try harder</h1>}

      <h2>you answered {answeredPercentage}% of the questions correctly</h2>
      <h2>
        you answered {easyAnsweredPercentage}% of the easy questions correctly
      </h2>
      <h2>
        you answered {mediumAnsweredPercentage}% of the medium questions
        correctly
      </h2>
      <h2>
        you answered {hardAnsweredPercentage}% of the hard questions correctly
      </h2>

      <Button onClick={handleReset} className="bg-slate-500">
        Repeat test
      </Button>

      <div className="flex flex-col gap-3 items-center px-3 md:grid md:grid-cols-3 md:grid-rows-3">
        {answeredQuestions.map((question) => (
          <AnsweredQuestion question={question} key={question.id} />
        ))}
      </div>
    </div>
  );
};
