import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { IndexPage } from "./components/index-page";

function App() {
  return (
    <Provider store={store}>
      <IndexPage />
    </Provider>
  );
}

export default App;
