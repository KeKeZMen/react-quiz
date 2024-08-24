import { createBrowserRouter } from "react-router-dom";
import { Mainpage } from "./main-page";
import { Questionpage } from "./question-page";
import { Finalpage } from "./final-page";
import { Layout } from "@widgets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/:questionId",
        element: <Questionpage />,
      },
      {
        path: "/final",
        element: <Finalpage />,
      },
    ],
  },
]);
