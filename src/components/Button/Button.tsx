import React, { Component } from "react";
import { StyledButton } from "./Button.styles";


interface ButtonProps {
  name: string;
  handleClick: () => void;
}
class Button extends Component<ButtonProps> {
  render() {
    const { handleClick, name } = this.props;

    return (
      <>
        <StyledButton
          onClick={handleClick}
        >
          {name}
        </StyledButton>
      </>
    );
  }
}

export default Button;
