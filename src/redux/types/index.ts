import { Action } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import store from "../store";
type StatusType = "success" | "started" | "failed";

export interface PhotoType {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}
export interface TableState {
  currentPage: number;
  photos: PhotoType[];
  status?: StatusType;
  selected: number[];
}


export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

