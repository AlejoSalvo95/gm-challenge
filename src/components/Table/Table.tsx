import React, { Component } from "react";
import photos from "../../photos.json";

function Table() {
    // TODO REMOVE PHOTO
  return (
    <div className="table-container" >
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
        </table>
    </div>
  );
}
export default Table;
