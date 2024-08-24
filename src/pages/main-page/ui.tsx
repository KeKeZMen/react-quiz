import { getQuestions, resetError } from "@entities/question";
import {
  Button,
  Input,
  useAppDispatch,
  useAppSelector,
  useToast,
} from "@shared";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Mainpage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();

  const { isLoading, questions, isError, error } = useAppSelector(
    (state) => state.questions
  );

  const [easyQuestionsCount, setEasyQuestionsCount] = useState(1);
  const handleEasyQuestionCount = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1 || +e.target.value > 4) return;
    setEasyQuestionsCount(+e.target.value);
  };

  const [mediumQuestionsCount, setMediumQuestionsCount] = useState(1);
  const handleMediumQuestionCount = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1 || +e.target.value > 4) return;
    setMediumQuestionsCount(+e.target.value);
  };

  const [hardQuestionsCount, setHardQuestionsCount] = useState(1);
  const handleHardQuestionCount = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1 || +e.target.value > 4) return;
    setHardQuestionsCount(+e.target.value);
  };

  const handleGetQuestions = () => {
    dispatch(
      getQuestions({
        easyQuestionsCount,
        mediumQuestionsCount,
        hardQuestionsCount,
      })
    );
  };

  useEffect(() => {
    if (questions.length > 0) {
      navigate(`/${questions[0].id}`);
    }

    if (isError) {
      switch (error?.status) {
        case 429:
          toast({
            title: "To many requests, try later",
            variant: "destructive",
          });
          break;

        default:
          toast({
            title: "Error",
            variant: "destructive",
          });
          break;
      }

      setTimeout(() => {
        dismiss();
        dispatch(resetError());
      }, 10000);
    }
  }, [questions, isError]);

  return (
    <main className="flex justify-center items-center h-[100dvh]">
      <div className="flex flex-col md:bg-slate-500 rounded-md md:shadow-md w-full md:w-[400px] p-6 gap-6 md:border md:border-white">
        <h1 className="text-center uppercase py-3 text-3xl text-white">
          React Quiz
        </h1>

        <label data-testid="easy-count">
          <span className="text-white">Easy questions count</span>
          <Input
            type="number"
            value={easyQuestionsCount}
            onChange={handleEasyQuestionCount}
            id="easy-count"
          />
        </label>

        <label data-testid="medium-count">
          <span className="text-white">Medium questions count</span>
          <Input
            type="number"
            value={mediumQuestionsCount}
            onChange={handleMediumQuestionCount}
            id="medium-count"
          />
        </label>

        <label data-testid="hard-count">
          <span className="text-white">Hard questions count</span>
          <Input
            type="number"
            value={hardQuestionsCount}
            onChange={handleHardQuestionCount}
            id="hard-count"
          />
        </label>

        <Button
          data-testid="load-button"
          onClick={handleGetQuestions}
          disabled={isLoading}
          variant="outline"
          id="load-button"
          className="absolute bottom-0 w-full rounded-none left-0 text-2xl py-6 bg-slate-500 hover:bg-slate-400 border-0 text-white md:static md:border md:rounded-md hover:text-white"
        >
          {isLoading ? "Loading..." : "Get questions"}
        </Button>
      </div>
    </main>
  );
};
