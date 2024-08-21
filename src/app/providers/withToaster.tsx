import { Toaster } from "@shared";

export const withToaster = (component: () => React.ReactNode) => () =>
  (
    <>
      <Toaster />
      {component()}
    </>
  );
