import { getQuestions } from "@entities/question";
import { Button, Input, useAppDispatch, useAppSelector } from "@shared";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Mainpage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, questions, isError } = useAppSelector(
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
  }, [questions]);

  return (
    <main className="flex justify-center items-center h-[100dvh]">
      <div className="flex flex-col bg-slate-500 rounded-md shadow-md w-[300px] p-3 gap-3">
        <h1 className="text-center uppercase py-3 text-3xl text-white">
          React Quiz
        </h1>

        <label>
          <span className="text-white">Easy questions count</span>
          <Input
            type="number"
            value={easyQuestionsCount}
            onChange={handleEasyQuestionCount}
            className="outline-none border-none"
          />
        </label>

        <label>
          <span className="text-white">Medium questions count</span>
          <Input
            type="number"
            value={mediumQuestionsCount}
            onChange={handleMediumQuestionCount}
          />
        </label>

        <label>
          <span className="text-white">Hard questions count</span>
          <Input
            type="number"
            value={hardQuestionsCount}
            onChange={handleHardQuestionCount}
          />
        </label>

        <Button
          onClick={handleGetQuestions}
          disabled={isLoading}
          variant="outline"
        >
          {isError ? "Error..." : isLoading ? "Loading..." : "Get questions"}
        </Button>
      </div>
    </main>
  );
};
