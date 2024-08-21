import { getQuestions } from "@entities/question";
import { useAppDispatch, useAppSelector } from "@shared";
import { ChangeEvent, useState } from "react";

export const Mainpage = () => {
  const dispatch = useAppDispatch();
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

  return (
    <div>
      <h1>Mainpage</h1>

      <input
        type="number"
        value={easyQuestionsCount}
        onChange={handleEasyQuestionCount}
        placeholder="easy"
      />

      <input
        type="number"
        value={mediumQuestionsCount}
        onChange={handleMediumQuestionCount}
        placeholder="medium"
      />

      <input
        type="number"
        value={hardQuestionsCount}
        onChange={handleHardQuestionCount}
        placeholder="hard"
      />

      <button onClick={handleGetQuestions}>Get questions</button>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        questions?.map((question) => (
          <div key={question.id}>{question.difficulty}</div>
        ))
      )}
    </div>
  );
};
