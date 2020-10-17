import React, { Component, useState } from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import Table from "./components/Table/Table";
import store from "./redux/store";

import "./style.css";


function App() {
  return (
    <Provider store={store}>
        <Table/>
    </Provider>
  );
}


render(<App />, document.getElementById("root"));
