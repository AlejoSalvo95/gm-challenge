import React, { Component, useState } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import TablePage from "./components/Table/TablePage";
import store from "./redux/store";

import "./style.css";

function App() {
  return (
    <Provider store={store}>
      <TablePage />
    </Provider>
  );
}

render(<App />, document.getElementById("root"));
