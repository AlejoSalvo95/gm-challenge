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
    handleEdit: (photo: PhotoType) => void;
}

const Table = ({ handleEdit }: TableProps) => {
    const tableState: TableState = useSelector(selector);

    const [selected, setSelected] = useState<number[]>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const { currentPage, photos } = tableState;

    const indexOfLastItem = currentPage * photosPerPage;
    const indexOfFirstItem = indexOfLastItem - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);

    const handleSelectedAll = () => {
        if (allSelected) {
            setSelected([]);
        } else {
            setSelected(photos.map((item) => item.id));
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
                        <ImgEdit onClick={() => handleEdit(element)} src="./img/edit.svg"></ImgEdit>
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
