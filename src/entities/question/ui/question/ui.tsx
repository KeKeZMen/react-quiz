import { IQuestionWithId } from "@entities/question/api";
import { answerQuestion } from "@entities/question/model";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  Button,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  useAppDispatch,
  useAppSelector,
  useGetAnswers,
  useToast,
} from "@shared";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  question: IQuestionWithId;
};

export const Question: FC<PropsType> = ({ question }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const { questions } = useAppSelector((state) => state.questions);

  const answers = useGetAnswers(question)

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const selectBooleanAnswer = (value: string) => {
    setSelectedAnswers([value]);
  };

  const selectMultipleAnswer = (answer: string, isChecked: CheckedState) => {
    isChecked
      ? setSelectedAnswers((prev) => [...prev, answer])
      : setSelectedAnswers((prev) => [
          ...prev.filter((selectedAnswer) => answer !== selectedAnswer),
        ]);
  };

  const handleAnswer = () => {
    if (selectedAnswers.length < 1) {
      toast({
        title: "Select at least 1 option",
        variant: "destructive",
      });
      return;
    }

    const isAnswered =
      question.correct_answer.slice().sort().join(",") ==
      selectedAnswers.slice().sort().join(",");

    dispatch(
      answerQuestion({
        ...question,
        selectedAnswers,
        isAnswered,
      })
    );

    const currentQuestionIndex = questions.findIndex(
      (questionFromStore) => questionFromStore.id === question.id
    );

    setSelectedAnswers([]);

    if (questions.length == currentQuestionIndex + 1) return navigate("/final");

    navigate(`/${questions[currentQuestionIndex + 1].id}`);
  };

  return (
    <div className="flex flex-col justify-between gap-3 items-center">
      <p className="shadow-lg p-2 rounded-md bg-slate-700 text-white ">
        {question.question}
      </p>

      {question.type === "boolean" ? (
        <RadioGroup
          onValueChange={selectBooleanAnswer}
          className="flex justify-around md:justify-center items-center w-full"
        >
          {answers.map((answer, i) => (
            <label
              key={i}
              className={clsx(
                "text-white shadow-lg p-2 rounded-md w-full md:w-[100px] cursor-pointer",
                selectedAnswers.includes(answer)
                  ? "bg-slate-400"
                  : "bg-slate-600"
              )}
            >
              <RadioGroupItem value={answer} className="hidden" />
              <p>{answer}</p>
            </label>
          ))}
        </RadioGroup>
      ) : (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:grid-rows-2 w-full">
          {answers.map((answer, i) => (
            <label
              key={`${answer}-${i}`}
              className={clsx(
                "text-white shadow-lg p-2 rounded-md cursor-pointer",
                selectedAnswers.includes(answer)
                  ? "bg-slate-400"
                  : "bg-slate-600"
              )}
            >
              <Checkbox
                checked={selectedAnswers.includes(answer)}
                defaultChecked={false}
                onCheckedChange={(isChecked) =>
                  selectMultipleAnswer(answer, isChecked)
                }
                className="hidden"
              />
              <p>{answer}</p>
            </label>
          ))}
        </div>
      )}

      <Button onClick={handleAnswer}>Answer</Button>
    </div>
  );
};
