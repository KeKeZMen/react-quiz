import { router } from "@pages";
import { RouterProvider } from "react-router-dom";
import { withProviders } from "./providers";

export const App = () => {
  return <RouterProvider router={router} />;
};

export default withProviders(App);
