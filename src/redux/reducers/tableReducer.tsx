import { TableInitally } from "../actions";

const tableReducer = (state = TableInitally, action) => {
  switch (action.type) {
    case "PAGE_FORWARD":
      return action.filter;
    default:
      return state;
  }
};

export default tableReducer;
