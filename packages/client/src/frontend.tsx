
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// https://bun.com/docs/bundler/hot-reloading#import-meta-hot-data
(import.meta.hot.data.root ??= createRoot(elem)).render(app);
