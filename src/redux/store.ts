import {
  configureStore,
} from "@reduxjs/toolkit";
import tableReducer from "./reducers/tableReducer";
import { useAppDispatch } from "./types";

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

export default store;
export { useAppDispatch };

