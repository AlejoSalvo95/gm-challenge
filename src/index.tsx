import React, { Component } from "react";
import { render } from "react-dom";
import {Provider} from "react-redux";
import { ButtonCounter } from "./components/Button/ButtonCounter";
import Table from "./components/Table/Table";


import store from "./redux/store";
import "./style.css";

interface AppState {
  name: string;
}

class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "Hello React Button",
    };
  }

  onChildClicked(e) {
    console.warn("callback from parent triggered", e);
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <p>Simple React Typescript Starter</p>
          <ButtonCounter
            name={this.state.name}
            onClicked={(e) => this.onChildClicked(e)}
          />
          {Table()}
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
