import { TableInitalState } from "../actions";
import {
  GET_PHOTOS_FAILED,
  GET_PHOTOS_STARTED,
  GET_PHOTOS_SUCCESS,
  GO_TO_PAGE,
  NEXT_PAGE,
  NEXT_X_PAGES,
  PREVIOUS_PAGE,
  PREVIOUS_X_PAGES,
} from "../actions";

const tableReducer = (state = TableInitalState, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case GO_TO_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case NEXT_X_PAGES:
      return {
        ...state,
        currentPage: state.currentPage + action.photosPerPage,
      };
    case PREVIOUS_X_PAGES:
      return {
        ...state,
        currentPage: state.currentPage - action.photosPerPage,
      };
    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.photos,
        status: "success",
      };
    case GET_PHOTOS_FAILED:
      return {
        ...state,
        photos: [],
        status: "failed",
      };
    case GET_PHOTOS_STARTED:
      return {
        ...state,
        status: "started",
      };
    default:
      return state;
  }
};

export default tableReducer;
