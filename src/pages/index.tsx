import { createBrowserRouter } from "react-router-dom";
import { Mainpage } from "./mainpage";
import { Questionpage } from "./question";
import { Finalpage } from "./final";
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
