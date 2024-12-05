import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./store/configureStore.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
