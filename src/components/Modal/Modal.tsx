import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PhotoType, TableState } from "../../redux/types";
import Button from "../Button/Button";
import { selector } from "../Table/Table";
import { ModalContainer, StyledModal } from "./Modal.styles";
interface ModalProps {
    onToggleModal: () => void;
    saveEdit: (photo: PhotoType) => void;
    photo: PhotoType;
}
export const Modal = ({ saveEdit, photo, onToggleModal }: ModalProps) => {
    const tableState: TableState = useSelector(selector);
    let backdrop: HTMLDivElement;
    const [newTitle, setNewTitle] = useState<string>(photo.title);
    const [newUrl, setNewUrl] = useState<string>(photo.url);

    const handleTitleChange = (title: string) => {
        setNewTitle(title);
    };
    const handleUrlChange = (url: string) => {
        setNewUrl(url);
    };
    const clickOutsideModal = (ev: any) => {
        ev.stopPropagation();
        if (ev.target === backdrop) {
            onToggleModal();
        }
    };

    return < ModalContainer ref={(b) => backdrop = b as any as HTMLDivElement} onClick={clickOutsideModal} >
        < StyledModal>
            <div>Id: {photo.id}</div>
            <div >
                <label >Title</label>
                <input
                    className="form-control"
                    type="text" value={newTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                />
            </div>

            <div >
                <label >Url</label>
                <input
                    className="form-control"
                    type="text" value={newUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                />
            </div>

            <Button label="Save" onClick={() => saveEdit({ ...photo, title: newTitle, url: newUrl })} ></Button>
        </StyledModal>;
    </ModalContainer>;
};
