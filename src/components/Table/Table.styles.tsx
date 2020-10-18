import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
export const StyledTable = styled.table`
    border-radius:15px;
    margin:6px;
    padding:12px;

    @media (max-width: 992px) {

    width: 100vw;
    display: block;
    overflow-x: auto;
    }
`;

export const TableContainer = styled.div`
    * {
        outline: none;
    }
    padding: 50px 100px;
    @media (max-width: 992px) {
        padding: 30px 15px;
    }
`;

export const TableHeader = styled.thead`
  @media (max-width: 425px) {
    padding: 30px 15px;
  }
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
export const PageIndex = styled.span`
    padding: 10px;
`;
export const SelectedPageIndex = styled.span`
    padding: 10px;
    font-weight: bold;
`;
export const PageIndexContainer = styled.div`
    text-align: center;
    padding: 20px 0;

`;
