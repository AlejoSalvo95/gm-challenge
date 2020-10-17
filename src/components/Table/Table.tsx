import React, { Component, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import photos from "../../photos.json";
import tableReducer from "../../redux/reducers/tableReducer";

function Table() {
    const [state, dispatch] = useReducer(tableReducer, []);

    // TODO REMOVE PHOTO
    // TODO SET DATA ON STORE
    const setStoreData = () => {
        // TODO CALL ACTION
        dispatch({ type: "PAGE_FORWARD", filter: "exxxx"});
    };
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
        {photos.map((element) => <tr className="t-row" >
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
