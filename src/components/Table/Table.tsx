import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhotosRequest } from "../../api";
import { indexNeighboors, jsonUrl, photosPerPage } from "../../config.json";
import {
    getPhotosFailed,
    getPhotosStarted,
    getPhotosSuccess,
    goToPage,
    nextPage,
    previousPage,
    saveEdit,
    updatePhotos
} from "../../redux/actions";
import { PhotoType, TableState } from "../../redux/types";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { Modal } from "../Modal/Modal";
import {
    ImgEdit, PageIndex, PageIndexContainer, SelectedPageIndex,
    StyledTable, TableContainer, TableData, TableHeader, TableRow
} from "./Table.styles";

export const selector = (state) => {
    return state.table;
};

const getPagesIndex = (currentPage: number, totalPages: number) => {
    const range = (start, end, length = end - start + 1) => [...Array(length).keys()].map((d) => d + start);
    const firstPage = currentPage - 1 - indexNeighboors;
    const lastPage = currentPage - 1 + indexNeighboors - totalPages;
    let endingIndex = lastPage < 0 ? currentPage + indexNeighboors : totalPages;
    if (firstPage < 0) {
        endingIndex -= firstPage;
    }
    const startingIndex = firstPage > 0 ? firstPage : 1;
    const i = startingIndex;
    return range(startingIndex, endingIndex);
};


function Table() {
    // TODO PASARLE COMPONENTES A LA TABLA
    // TODO NO ANY RULE
    const dispatch = useDispatch();
    const tableState: TableState = useSelector(selector);

    const [selected, setSelected] = useState<number[]>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [modalPhoto, setModalPhoto] = useState<PhotoType>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const { currentPage, photos, status } = tableState;


    const totalPages = Math.ceil(photos.length / photosPerPage);

    useEffect(() => {
        getAllPhotos();
    }, []);

    // Logic for displaying items
    const indexOfLastItem = currentPage * photosPerPage;
    const indexOfFirstItem = indexOfLastItem - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstItem, indexOfLastItem);
    // Logic for displaying page numbers

    let pageNumbers: number[] = [];
    if (totalPages > 0) pageNumbers = getPagesIndex(currentPage, totalPages);

    const handleGoToPage = (page: number) => {
        dispatch(goToPage(page));
    };
    const getAllPhotos = () => {
        dispatch(getPhotosStarted());
        getAllPhotosRequest()
            .then((json) => {
                if (json) dispatch(getPhotosSuccess(json));
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
    const handleSaveEdit = (photoEdited) => {
        setShowModal(false);
        let editedPhotoIdx = 0;
        const auxPhotos = [...photos];
        auxPhotos.map((photo, idx) => {
            if (photoEdited.id === photo.id) {
                editedPhotoIdx = idx;
            }
        });
        auxPhotos[editedPhotoIdx] = { ...photoEdited };
        dispatch(saveEdit(auxPhotos));
    };
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
    const handleDeleteSelected = () => {
        let confirmDelete = true;
        if (allSelected) {
            confirmDelete = confirm("Are you sure?");
        }
        if (confirmDelete) {
            setAllSelected(false);
            setSelected([]);
            const auxPhotos: PhotoType[] = [];
            photos.map((item) => {
                const index = selected.indexOf(item.id);
                if (index === -1) {
                    auxPhotos.push({ ...item });
                }
            });
            dispatch(updatePhotos(auxPhotos));
        }
    };
    const handleEdit = (photo?: PhotoType) => {
        if (photo) {
            setModalPhoto(photo);
        }
        setShowModal(!showModal);
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

    const buttonDeleteSelected = <Button label={"Delete Selected "} onClick={handleDeleteSelected} ></Button>;
    const tableIndex = totalPages > 0 && <PageIndexContainer>
        {
            pageNumbers.indexOf(photos[0].id) === -1 &&
            <PageIndex
                onClick={() => handleGoToPage(1)}
            >First</PageIndex>
        }
        {
            currentPage !== 1 &&
            <PageIndex
                onClick={() => handlePreviousPage()}
            >«</PageIndex>
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
            {showModal && <Modal saveEdit={handleSaveEdit} photo={modalPhoto} onToggleModal={handleEdit} />}
            {
                !status ?
                    <p onClick={() => getAllPhotos()}
                    >Get Photos</p>
                    : status === "success" ?
                        <div>
                            {tableShown}
                            {buttonDeleteSelected}
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
