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
}

const Table = ({ editRowButton, handleSelected, handleSelectedAll }: TableProps) => {

    const tableState: TableState = useSelector(selector);

    const [allSelected, setAllSelected] = useState<boolean>(false);
    const { currentPage, photos, selected } = tableState;

    const indexOfLastItem = currentPage * photosPerPage;
    const indexOfFirstItem = indexOfLastItem - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);


    const tableShown = <StyledTable className="table" >
        <TableHeader className="t-header" >
            <TableRow className="t-row" >
                <TableData className="t-data">
                    <Checkbox isChecked={allSelected} handleCheckboxChange={handleSelectedAll} label={""} />
                </TableData>
                <TableData className="t-data" >Id </TableData>
                <TableData className="t-data" >Title </TableData>
                <TableData className="t-data" >Url </TableData>
                <TableData className="t-data" >Thumbnail Url </TableData>
                <TableData className="t-data" >Edit </TableData>
            </TableRow>
        </TableHeader>
        <tbody className="t-body" >
            {currentPhotos && currentPhotos.length ?
                currentPhotos.map((element, idx) => <TableRow key={idx} className="t-row" >
                    <TableData className="t-data" >
                        <Checkbox
                            isChecked={selected.indexOf(element.id) > -1}
                            handleCheckboxChange={() => handleSelected(element.id)} label={""}
                        />
                    </TableData>
                    <TableData className="t-data" >{element.id} </TableData>
                    <TableData className="t-data" >{element.title} </TableData>
                    <TableData className="t-data" >{element.url} </TableData>
                    <TableData className="t-data" >{element.thumbnailUrl} </TableData>
                    <TableData className="t-data" >
                        {editRowButton(element)}
                    </TableData>
                </TableRow>)
                : <TableRow className="t-row" >
                    <td colSpan={5} className="t-data" >No data</td>
                </TableRow>}
        </tbody>
    </StyledTable>;

    return tableShown;
};

export default Table;
