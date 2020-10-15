import React, { Component } from "react";
import { render } from "react-dom";
import { ButtonCounter } from "./ButtonCounter";
import "./style.css";

interface AppState {
  name: string;
}

class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "Hello React Button"
    };
  }

  onChildClicked(e) {
    console.warn("callback from parent triggered", e);
  }

  render() {
    return (
      <div>
        <p>Simple React Typescript Starter</p>
        <ButtonCounter
          name={this.state.name}
          onClicked={e => this.onChildClicked(e)}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
