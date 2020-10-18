import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
export const StyledButton = styled.button`
  background:white;
  border-radius:15px;
  margin:6px;
  padding:12px;
  &:active, &:focus{
    outline: none;
  }
`;

