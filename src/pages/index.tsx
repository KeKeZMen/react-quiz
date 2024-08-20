import { createBrowserRouter } from "react-router-dom";
import { Mainpage } from "./mainpage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
]);
