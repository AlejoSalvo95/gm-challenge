import React, { Component, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import photos from "../../photos.json";

function selector(state) {
    return state;
}
function Table() {
    // TODO REMOVE PHOTO
    // TODO SET DATA ON STORE
    const setStoreData = () => {
        // TODO CALL ACTION
    };
    const result = useSelector(selector);
    return (
    <div className="table-container" >
         <span
            onClick={setStoreData}
          >Test</span>

        <table className="table" >
        <thead className="t-header" >
            <tr className="t-row" >
                    <td className="t-data" >title </td>
                    <td className="t-data" >url </td>
                    <td className="t-data" >thumbnailUrl </td>
                </tr>
            </thead>
        <tbody className="t-body" >
        {photos.map((element,idx) => <tr key={idx} className="t-row" >
            <td className="t-data" >{element.title} </td>
            <td className="t-data" >{element.url} </td>
            <td className="t-data" >{element.thumbnailUrl} </td>
            </tr>)
        }
            </tbody>
        </table>;
    </div>);
}
export default Table;
