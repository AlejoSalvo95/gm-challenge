import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { indexNeighboors, photosPerPage } from "../../config.json";
import { PhotoType, TableState } from "../../redux/types";
import Checkbox from "../Checkbox/Checkbox";
import {
    ImgEdit, StyledTable, TableData, TableHeader, TableRow
} from "./Table.styles";

export const selector = (state) => {
    return state.table;
};

interface TableProps {
    editRowButton: (photo: PhotoType) => JSX.Element;
    handleSelected: (id: number) => void;
    handleSelectedAll: () => void;
    allSelected: boolean;
}

const Table = ({ editRowButton, handleSelected, handleSelectedAll, allSelected }: TableProps) => {

    const tableState: TableState = useSelector(selector);

    const { currentPage, photos, selected } = tableState;

    const indexOfLastItem = currentPage * photosPerPage;
    const indexOfFirstItem = indexOfLastItem - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);


    const tableShown = <StyledTable>
        <TableHeader>
            <TableRow>
                <TableData>
                    <Checkbox isChecked={allSelected} handleCheckboxChange={handleSelectedAll} label={""} />
                </TableData>
                <TableData>Id </TableData>
                <TableData>Title </TableData>
                <TableData>Url </TableData>
                <TableData>Thumbnail Url </TableData>
                <TableData>Edit </TableData>
            </TableRow>
        </TableHeader>
        <tbody>
            {currentPhotos && currentPhotos.length ?
                currentPhotos.map((element, idx) => <TableRow key={idx}>
                    <TableData >
                        <Checkbox
                            isChecked={selected.indexOf(element.id) > -1}
                            handleCheckboxChange={() => handleSelected(element.id)} label={""}
                        />
                    </TableData>
                    <TableData>{element.id} </TableData>
                    <TableData>{element.title} </TableData>
                    <TableData>{element.url} </TableData>
                    <TableData>{element.thumbnailUrl} </TableData>
                    <TableData>
                        {editRowButton(element)}
                    </TableData>
                </TableRow>)
                : <TableRow>
                    <td colSpan={5}>No data</td>
                </TableRow>}
        </tbody>
    </StyledTable>;

    return tableShown;
};

export default Table;
