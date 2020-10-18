import React from "react";
import { StyledButton, StyledDiv } from "./Button.styles";

export const Button = (name, handleClick) => {
  return (
    <div>
      <StyledButton
        onClick={handleClick}
      >
        {name}
      </StyledButton>
      <StyledDiv />
    </div>
  );
};
