import { TableInitalState } from "../actions";
import {
  GET_PHOTOS_FAILED,
  GET_PHOTOS_STARTED,
  GET_PHOTOS_SUCCESS,
  GO_TO_PAGE,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  SAVE_EDIT,
  UPDATE_PHOTOS
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
    case UPDATE_PHOTOS:
      return {
        ...state,
        photos: action.photos,
        status: action.resetStatus ? undefined : state.status,
      };
    case GET_PHOTOS_STARTED:
      return {
        ...state,
        status: "started",
      };
    case SAVE_EDIT:
      return {
        ...state,
        photos: action.photos,

      };

    default:
      return state;
  }
};

export default tableReducer;
