import {
    configureStore,
    getDefaultMiddleware,
  } from "@reduxjs/toolkit";
import httpHandler from "./middleware/http-handler";
import tableReducer from "./reducers/tableReducer";
import { useAppDispatch } from "./types";

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    httpHandler,
  ],
});

export default store;
export { useAppDispatch };

