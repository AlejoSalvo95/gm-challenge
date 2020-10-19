export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const GO_TO_PAGE = "GO_TO_PAGE";
export const GET_PHOTOS_STARTED = "GET_PHOTOS_STARTED";
export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_FAILED = "GET_PHOTOS_FAILED";
export const UPDATE_PHOTOS = "UPDATE_PHOTOS";
export const SAVE_EDIT = "SAVE_EDIT";
export const SET_SELECTED = "SET_SELECTED";

import { PhotoType } from "../types";

import { TableState } from "../types";
export function getPhotosStarted() {
  return {
    type: GET_PHOTOS_STARTED,
  };
}
export function getPhotosSuccess(photos: PhotoType) {
  return {
    type: GET_PHOTOS_SUCCESS,
    photos,
  };
}
export function getPhotosFailed() {
  return {
    type: GET_PHOTOS_FAILED,
  };
}
export function updatePhotos(photos: PhotoType[]) {
  return {
    type: UPDATE_PHOTOS,
    photos,
    currentPage: 1,
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE,
  };
}
export function previousPage() {
  return {
    type: PREVIOUS_PAGE,
  };
}

export function goToPage(page: number) {
  return {
    type: GO_TO_PAGE,
    page,
  };
}

export function saveEdit(photos: PhotoType[]) {
  return {
    type: SAVE_EDIT,
    photos,
  };
}
export function setSelected(selected: number[]) {
  return {
    type: SET_SELECTED,
    selected,
  };
}
export const TableInitalState: TableState = {
  currentPage: 1,
  photos: [],
  selected: [],
};
