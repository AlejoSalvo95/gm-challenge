import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
export const ModalContainer = styled.div`
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:9999;
    background:rgba(0,0,0,0.5);
    display:flex;
    flex-direction:column;
    justify-content:center;
    transition:opacity 0.4s ease-out;
    -webkit-transition:opacity 0.4s ease-out;
`;

export const StyledModal = styled.div`
    min-width:650px;
    max-width:700px;
    margin:0 auto;
    padding:20px 20px 30px;
    background:#FFFFFF;
    border-radius:6px;
    transition:all 0.35s ease-out;
    -webkit-transition:all 0.35s ease-out;
    transition-delay:0.3s;
    -webkit-transition-delay:0.3s;
`;
