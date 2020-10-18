import React, { Component, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { TableState } from "../../redux/types";

import {
    getPhotosFailed,
    getPhotosStarted,
    getPhotosSuccess,
} from "../../redux/actions";
const selector = (state) => {
    return state.table;
};
const jsonUrl = "https://jsonplaceholder.typicode.com/";
const getData = (dispatch) => {
    dispatch(getPhotosStarted());
    fetch(jsonUrl + "photos")
        .then((response) => response.json())
        .then((json) => {
            if (json) {
                dispatch(getPhotosSuccess(json));
            }
        })
        .catch(() => { dispatch(getPhotosFailed()); });
};
function Table() {
    // TODO REMOVE PHOTO
    const dispatch = useDispatch();
    const nexPage = () => {
        dispatch({ type: "NEXT_PAGE", filter: "rrr" });
    };
    const tableState: TableState = useSelector(selector);

    return (
        !tableState.status || tableState.status === "success" ?
            <div className="table-container" >
                <span
                    onClick={nexPage}
                >next</span>
                <span
                    onClick={() => getData(dispatch)}
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
                        {tableState && tableState.photos ?
                            tableState.photos.map((element, idx) => <tr key={idx} className="t-row" >
                                <td className="t-data" >{element.title} </td>
                                <td className="t-data" >{element.url} </td>
                                <td className="t-data" >{element.thumbnailUrl} </td>
                            </tr>)
                            : <tr className="t-row" >
                                <td className="t-data" >No rows</td>
                            </tr>}
                    </tbody>
                </table>
            </div>

            : tableState.status === "failed" ?
                <p>Failed</p>
                : <p>Loading</p>);
}
export default Table;
