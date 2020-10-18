import React, { Component, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { indexNeighboors, photosPerPage } from "../../config.json";
import {
    getPhotosFailed,
    getPhotosStarted,
    getPhotosSuccess,
    goToPage,
    nextPage,
    previousPage,
} from "../../redux/actions";
import { TableState } from "../../redux/types";
import { StyledTable, TableContainer, TableData, TableHeader, TableRow } from "./Table.styles";

const selector = (state) => {
    return state.table;
};

function Table() {
    // TODO REMOVE PHOTO
    const dispatch = useDispatch();

    const tableState: TableState = useSelector(selector);

    // Logic for displaying items
    const indexOfLastItem = tableState.currentPage * photosPerPage;
    const indexOfFirstItem = indexOfLastItem - photosPerPage;
    const currentPhotos = tableState.photos.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const pageNumbers = [];

    const getPagesIndex = (currentPage) => {
        const totalPages = Math.ceil(tableState.photos.length / photosPerPage);
        const startingIndex = currentPage - indexNeighboors > 0 ? currentPage - indexNeighboors : 0;
        const endingIndex = currentPage + indexNeighboors;
        let i = startingIndex;
        while (i < endingIndex) {
            if (i > 0 && i < totalPages) {
                pageNumbers.push(i);
            }
            i++;
        }
    };

    const pagesIndex = getPagesIndex(tableState.currentPage);

    const numberClicked = (page: number) => {
        dispatch(goToPage(page));
    };

    const jsonUrl = "https://jsonplaceholder.typicode.com/";
    const getData = () => {
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
    const handleNextPage = () => {
        if (tableState.currentPage < 1) {
            dispatch(nextPage());
        }
    };
    const handlePreviousPage = () => {
        if (tableState.currentPage > 0) {
            dispatch(previousPage());
        }
    };

    return (
        <TableContainer >
            {
                !tableState.status || tableState.status === "success" ?
                    <div>
                        <p
                            onClick={() => getData()}
                        >Get Photos</p>

                        <StyledTable className="table" >
                            <TableHeader className="t-header" >
                                <TableRow className="t-row" >
                                    <TableData className="t-data" >id </TableData>
                                    <TableData className="t-data" >title </TableData>
                                    <TableData className="t-data" >url </TableData>
                                    <TableData className="t-data" >thumbnailUrl </TableData>
                                </TableRow>
                            </TableHeader>
                            <tbody className="t-body" >
                                {currentPhotos && currentPhotos.length ?
                                    currentPhotos.map((element, idx) => <TableRow key={idx} className="t-row" >
                                        <TableData className="t-data" >{element.id} </TableData>
                                        <TableData className="t-data" >{element.title} </TableData>
                                        <TableData className="t-data" >{element.url} </TableData>
                                        <TableData className="t-data" >{element.thumbnailUrl} </TableData>
                                    </TableRow>)
                                    : <TableRow className="t-row" >
                                        <td colSpan={3} className="t-data" >No data</td>
                                    </TableRow>}
                            </tbody>
                        </StyledTable>

                        <p
                            onClick={() => handleNextPage()}
                        >next</p>
                        {
                            pageNumbers.map((num, idx) =>
                                <span
                                    key={idx}
                                    onClick={() => numberClicked(num)}
                                >
                                    {num}
                                </span>

                            )
                        }

                        <p
                            onClick={() => handlePreviousPage()}
                        >previous</p>
                    </div>

                    : tableState.status === "failed" ?
                        <p>Failed</p>
                        : <p>Loading</p>
            }
        </TableContainer>
    );

}
export default Table;
