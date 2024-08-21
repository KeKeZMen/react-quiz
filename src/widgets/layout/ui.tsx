import { useAppSelector } from "@shared";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();
  const { questions } = useAppSelector((state) => state.questions);

  useEffect(() => {
    if (!questions || questions.length < 1) {
      navigate("/");
    }
  }, [questions]);

  return (
    <main className="min-h-[100dvh] flex justify-center items-center">
      <Outlet />
    </main>
  );
};
