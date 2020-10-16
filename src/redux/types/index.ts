import { Action } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import store from "../store";

export type fetchAction = {
  type: string[];
  callAPI?: () => Promise<AxiosResponse<any>>;
  shouldCallAPI?: () => true;
  callFetch?: () => Promise<any>;
  payload?: {};
} & Action;

export type ResponseAction = Action & {
  response?: GenericAPIResponse | any;
  error?: GenericAPIResponse | any;
  payload?: GenericAPIResponse | any;
};


export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

interface PagesObject {
  [key: string]: string[];
}

export interface EntityPaginationObject {
  pages: PagesObject;
  currentPage: number;
  totalPages?: number;
  count?: number;
}

export interface GenericEntityState {
  loading: boolean;
  // should have a generic response type for example {status,message}
  response: GenericAPIResponse & any;
  // should have a n error type defined in the axios setup (interceptors) for http errors
  error: any;
  pagination?: EntityPaginationObject;
  [key: string]: any;
}

export interface GenericAPIResponse {
  status: number;
  message: string;
}
