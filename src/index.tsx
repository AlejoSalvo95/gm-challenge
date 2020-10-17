import React, { Component } from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import Table from "./components/Table/Table";


import store from "./redux/store";
import "./style.css";

interface AppState {
  name: string;
}

function App() {
  return (
    <Provider store={store}>
      <div>
        {Table()}
      </div>
    </Provider>
  );
}

render(<App />, document.getElementById("root"));
