import React, { Component } from "react";
import { StyledButton } from "./Button.styles";


interface ButtonProps {
  label: string;
  onClick: () => void;
}
class Button extends Component<ButtonProps> {
  render() {
    const { onClick, label } = this.props;

    return (
      <>
        <StyledButton
          onClick={onClick}
        >
          {label}
        </StyledButton>
      </>
    );
  }
}

export default Button;
