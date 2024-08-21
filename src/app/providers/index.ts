import compose from "compose-function";
import { withStore } from "./withStore";
import { withToaster } from "./withToaster";

export const withProviders = compose(withStore, withToaster);
