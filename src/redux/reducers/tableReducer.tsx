import { TableInitalState } from "../actions";
import {
  GET_PHOTOS_FAILED,
  GET_PHOTOS_STARTED,
  GET_PHOTOS_SUCCESS,
  NEXT_PAGE,
  PREVIOUS_PAGE,
} from "../actions";

const tableReducer = (state = TableInitalState, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return {
        ...state,
        pageIdx: state.pageIdx + 1,
      };
    case PREVIOUS_PAGE:
      return {
        ...state,
        pageIdx: state.pageIdx - 1,
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
