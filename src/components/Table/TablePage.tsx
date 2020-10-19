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
    setSelected,
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


import Table from "./Table";
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
    endingIndex = endingIndex > totalPages ? totalPages : endingIndex;
    return range(startingIndex, endingIndex);
};


function TablePage() {
    // TODO NO ANY RULE
    const dispatch = useDispatch();
    const tableState: TableState = useSelector(selector);

    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [modalPhoto, setModalPhoto] = useState<PhotoType>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const { currentPage, photos, status, selected } = tableState;

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
            dispatch(setSelected([]));
        } else {
            dispatch(setSelected(photos.map((item) => item.id)));
        }
        setAllSelected(!allSelected);
    };
    const handleSelected = (id: number) => {
        const index = selected.indexOf(id);
        if (index === -1) {
            dispatch(setSelected(selected.concat(id)));
        } else {
            const auxSelected = [...selected];
            auxSelected.splice(index, 1);
            dispatch(setSelected(auxSelected));
        }
    };
    const handleDeleteSelected = () => {
        console.log(selected, "selected");
        let confirmDelete = true;
        if (allSelected) {
            confirmDelete = confirm("Are you sure?");
        }
        if (confirmDelete) {
            setAllSelected(false);
            dispatch(setSelected([]));
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
        toggleModal();
    };
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const editRowButton = (element) => <ImgEdit onClick={() => handleEdit(element)} src="./img/edit.svg"></ImgEdit>;
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
            {showModal && <Modal saveEdit={handleSaveEdit} photo={modalPhoto} onToggleModal={toggleModal} />}
            {
                !status ?
                    <p onClick={() => getAllPhotos()}
                    >Get Photos</p>
                    : status === "success" ?
                        <div>
                            <Table
                                handleSelected={handleSelected}
                                handleSelectedAll={handleSelectedAll}
                                editRowButton={editRowButton} />
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

export default TablePage;
