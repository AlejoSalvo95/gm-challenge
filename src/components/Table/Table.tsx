import React, { Component, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { indexNeighboors, photosPerPage } from "../../config.json";
import {
    getPhotosFailed,
    getPhotosStarted,
    getPhotosSuccess,
    goToPage,
    nextPage,
    previousPage
} from "../../redux/actions";
import { TableState } from "../../redux/types";
import Checkbox from "../Checkbox/Checkbox";
import {
    PageIndex, PageIndexContainer, SelectedPageIndex, StyledTable,
    TableContainer, TableData, TableHeader, TableRow
} from "./Table.styles";

const selector = (state) => {
    return state.table;
};

function Table() {
    // TODO REMOVE PHOTO
    // TODO MOVE HTTP CALL
    const dispatch = useDispatch();

    const tableState: TableState = useSelector(selector);
    const [selected, setSelected] = useState<number[]>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const { currentPage, photos, status } = tableState;
    const totalPages = Math.ceil(photos.length / photosPerPage);

    // Logic for displaying items
    const indexOfLastItem = currentPage * photosPerPage;
    const indexOfFirstItem = indexOfLastItem - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    let pageNumbers: number[] = [];
    const range = (start, end, length = end - start + 1) => [...Array(length).keys()].map((d) => d + start);

    const getPagesIndex = () => {
        const lowerDiff = currentPage - 1 - indexNeighboors;
        const higherDiff = currentPage - 1 + indexNeighboors - totalPages;
        let endingIndex = higherDiff < 0 ? currentPage + indexNeighboors : totalPages;
        if (lowerDiff < 0) {
            endingIndex -= lowerDiff;
        }
        const startingIndex = lowerDiff > 0 ? lowerDiff : 1;
        const i = startingIndex;
        return range(startingIndex, endingIndex);
    };
    pageNumbers = getPagesIndex();
    const handleGoToPage = (page: number) => {
        dispatch(goToPage(page));
    };

    const jsonUrl = "https://jsonplaceholder.typicode.com/";
    useEffect(() => {
        getData();
    }, []);
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
        if (currentPage < totalPages) {
            dispatch(nextPage());
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            dispatch(previousPage());
        }
    };
    const handleSelectedAll = () => {
        if (allSelected) {
            setSelected([]);
        }
        setAllSelected(!allSelected);
    };
    const handleSelected = (id: number) => {
        const index = selected.indexOf(id);
        if (index === -1) {
            setSelected(selected.concat(id));
        } else {
            const auxSelected = [...selected];
            auxSelected.splice(index, 1);
            setSelected(auxSelected);
        }
    };

    const tableShown = <StyledTable className="table" >
        <TableHeader className="t-header" >
            <TableRow className="t-row" >
                <TableData className="t-data">
                    <Checkbox isChecked={allSelected} handleCheckboxChange={handleSelectedAll} label={""} />
                </TableData>
                <TableData className="t-data" >id </TableData>
                <TableData className="t-data" >title </TableData>
                <TableData className="t-data" >url </TableData>
                <TableData className="t-data" >thumbnailUrl </TableData>
            </TableRow>
        </TableHeader>
        <tbody className="t-body" >
            {currentPhotos && currentPhotos.length ?
                currentPhotos.map((element, idx) => <TableRow key={idx} className="t-row" >
                    <TableData className="t-data" >
                        <Checkbox
                            isChecked={allSelected || selected.indexOf(element.id) > -1}
                            handleCheckboxChange={() => handleSelected(element.id)} label={""}
                        />
                    </TableData>
                    <TableData className="t-data" >{element.id} </TableData>
                    <TableData className="t-data" >{element.title} </TableData>
                    <TableData className="t-data" >{element.url} </TableData>
                    <TableData className="t-data" >{element.thumbnailUrl} </TableData>
                </TableRow>)
                : <TableRow className="t-row" >
                    <td colSpan={3} className="t-data" >No data</td>
                </TableRow>}
        </tbody>
    </StyledTable>;

    const tableIndex = <PageIndexContainer>
        {
            currentPage !== 1 &&
            <PageIndex
                onClick={() => handlePreviousPage()}
            >«</PageIndex>
        }
        {
            pageNumbers.indexOf(1) === -1 &&
            <PageIndex
                onClick={() => handleGoToPage(1)}
            >First</PageIndex>
        }
        {
            pageNumbers.map((num, idx) => {
                return num === currentPage ?
                    <SelectedPageIndex
                        key={idx}
                        onClick={() => handleGoToPage(num)}
                    >
                        {num}
                    </SelectedPageIndex>
                    : <PageIndex
                        key={idx}
                        onClick={() => handleGoToPage(num)}
                    >
                        {num}
                    </PageIndex>;
            })
        }
        {
            currentPage !== totalPages &&
            <PageIndex
                onClick={() => handleNextPage()}
            >»</PageIndex>
        }
        {
            pageNumbers.indexOf(totalPages) === -1 &&
            <PageIndex
                onClick={() => handleGoToPage(totalPages)}
            >Last</PageIndex>
        }
    </PageIndexContainer>;

    return (
        <TableContainer >
            {
                !status ? <p
                    onClick={() => getData()}
                >Get Photos</p> : status === "success" ?
                        <div>
                            {tableShown}
                            {tableIndex}
                        </div>
                        : status === "failed" ?
                            <p>Failed</p>
                            : <p>Loading</p>
            }
        </TableContainer>
    );
}

export default Table;
