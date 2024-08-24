import { Question } from "@entities/question";
import { useAppSelector } from "@shared";
import { useParams } from "react-router-dom";

type ParamsType = {
  questionId: string;
};

export const Questionpage = () => {
  const { questionId } = useParams<ParamsType>();
  const { questions } = useAppSelector((state) => state.questions);
  const question = questions.find((question) => question.id === questionId);

  return <>{question && <Question question={question} />}</>;
};
