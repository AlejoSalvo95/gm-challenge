import { TableInitally } from "../actions";

const tableReducer = (state = TableInitally, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        pageIdx: state.pageIdx + 1,
      };
      case "PREVIOUS_PAGE":
        return {
          ...state,
          pageIdx: state.pageIdx - 1,
        };
        case "SET_PHOTOS":
          return {
            ...state,
            photos: action.photos,
          };
    default:
      return state;
  }
};

export default tableReducer;
