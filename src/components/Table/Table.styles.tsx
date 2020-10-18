import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
export const StyledTable = styled.table`
    border-radius:15px;
    margin:6px;
    padding:12px;
`;

export const TableContainer = styled.div`
  padding: 50px 100px;
`;

export const TableHeader = styled.thead`
  padding: 50px 100px;
  background-color: lightgrey;
`;

export const TableRow = styled.tr`
    padding: .5em;
    border-bottom: 1px solid lightgrey;
`;
export const TableData = styled.td`
    padding: .5em;
    border-bottom: 1px solid lightgrey;
`;
