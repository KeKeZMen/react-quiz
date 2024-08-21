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
        "flex justify-center h-[500px] rounded-md shadow-md w-[300px]",
        question.isAnswered ? "bg-green-600" : "bg-red-600"
      )}
    >
      <div className="text-white grid grid-rows-3">
        <h2 className="text-center border-b border-white p-3">
          {question.question}
        </h2>

        <div className="flex flex-col items-center border-b border-white py-3">
          <p className="mb-1">Your answers: </p>
          <div className="flex flex-col items-center">
            {question.selectedAnswers.map((answer, i) => (
              <p key={i}>{answer}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center py-3">
          <p className="mb-1">Correct answers: </p>
          <div className="flex flex-col items-center">
            {question.correct_answer.map((answer, i) => (
              <p key={i}>{answer}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
