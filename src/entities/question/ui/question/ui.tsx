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

  const answers = useGetAnswers(question);

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

    if (questions.length == currentQuestionIndex + 1) return navigate("/final");

    navigate(`/${questions[currentQuestionIndex + 1].id}`);
  };

  useEffect(() => {
    setSelectedAnswers([]);
  }, [question.question]);

  return (
    <div className="flex flex-col justify-between gap-3 items-center">
      <p className="p-3 rounded-md text-white text-3xl text-center">
        {question.question}
      </p>

      {question.type === "boolean" ? (
        <RadioGroup className="grid grid-cols-2 justify-around md:justify-center items-center w-full">
          {answers.map((answer, i) => (
            <label
              key={i}
              className={clsx(
                "text-white shadow-lg p-2 rounded-md w-full cursor-pointer text-center text-xl",
                selectedAnswers.includes(answer)
                  ? "bg-slate-500"
                  : "bg-slate-700"
              )}
            >
              <RadioGroupItem
                value={answer}
                className="hidden"
                onClick={() => selectBooleanAnswer(answer)}
              />
              <p>{answer}</p>
            </label>
          ))}
        </RadioGroup>
      ) : (
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 w-full">
          {answers.map((answer, i) => (
            <label
              key={`${answer}-${i}`}
              className={clsx(
                "text-white shadow-lg p-2 rounded-md cursor-pointer text-center text-2xl hover:bg-slate-500 transition-all",
                selectedAnswers.includes(answer)
                  ? "bg-slate-500"
                  : "bg-slate-700"
              )}
            >
              <Checkbox
                checked={selectedAnswers.includes(answer)}
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

      <Button onClick={handleAnswer} className="w-full bg-slate-500 hover:bg-slate-400 text-2xl py-[30px] rounded-none absolute bottom-0 md:static md:rounded-md md:w-[200px]">Answer</Button>
    </div>
  );
};
