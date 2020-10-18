export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const GET_PHOTOS_STARTED = "GET_PHOTOS_STARTED";
export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_FAILED = "GET_PHOTOS_FAILED";

import { TableState } from "../types";
export function getPhotosStarted() {
  return {
    type: GET_PHOTOS_STARTED,
  };
}
export function getPhotosSuccess(photos) {
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

export const TableInitalState: TableState = {
  pageIdx: 0,
  photos: [],
};
