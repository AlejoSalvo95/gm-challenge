import React, { Component, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

const selector =  (state) =>  {
    return state.table;
};

const getData = (dispatch) => {
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if(json){
        dispatch({ type: "SET_PHOTOS", photos: json });
      }
  });
};
function Table() {
    // TODO REMOVE PHOTO
    // TODO ASYNC CALL AND MANAGE HTTP STATUS IN STATE
    const dispatch = useDispatch();
    const nexPage = () => {
        dispatch({ type: "NEXT_PAGE", filter: "rrr" });
    };
    const tableState = useSelector(selector);
    console.log(tableState,"tableState");

    return (
    <div className="table-container" >
         <span
            onClick={nexPage}
          >next</span>
         <span
            onClick={()=>getData(dispatch)}
          >get</span>

        <table className="table" >
        <thead className="t-header" >
            <tr className="t-row" >
                    <td className="t-data" >title </td>
                    <td className="t-data" >url </td>
                    <td className="t-data" >thumbnailUrl </td>
                </tr>
            </thead>
        <tbody className="t-body" >
        {tableState && tableState.photos ? tableState.photos.map((element,idx) => <tr key={idx} className="t-row" >
            <td className="t-data" >{element.title} </td>
            <td className="t-data" >{element.url} </td>
            <td className="t-data" >{element.thumbnailUrl} </td>
            </tr>)
        : <tr  className="t-row" >
        <td className="t-data" >No rows</td>
        </tr>}
            </tbody>
        </table>;
    </div>);
}
export default Table;
