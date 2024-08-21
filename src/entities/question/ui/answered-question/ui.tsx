import { IStoredQuestionWithId } from "@entities/question/api";
import clsx from "clsx";
import { FC } from "react";

type PropsType = {
  question: IStoredQuestionWithId;
};

export const AnsweredQuestion: FC<PropsType> = ({ question }) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center h-[300px] rounded-md shadow-md w-full p-3",
        question.isAnswered ? "bg-green-400" : "bg-red-400"
      )}
    >
      <div className="flex flex-col text-white ">
        <h2 className="text-center">
          Question: <br /> {question.question}
        </h2>
        <p className="text-center">
          Your answers: <br />
          {question.selectedAnswers.map((answer) => answer).join(", ")}
        </p>
        <p className="text-center">
          Correct answers: <br />
          {question.correct_answer.map((answer) => answer).join(", ")}
        </p>
        <p className="text-center">
          Question difficulty: <br />
          {question.difficulty}
        </p>
      </div>
    </div>
  );
};
