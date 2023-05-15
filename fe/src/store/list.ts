import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./index";

import DataType from '../../types'

const initialList: DataType[] = [];

export const fetchList = createAsyncThunk(
  'list/initList',
  async () => {
    const res = await initList();
    return res.data.list;
  }
)

// A mock function to mimic making an async request for data
const initList = () => axios.get("/api/stu/list", {
    params: {
      pageindex: 1,
      pagesize: 20,
    },
  });


export const listSlice = createSlice({
  name: "list",
  initialState: initialList,
  reducers: {
    createItem: (state, action: PayloadAction<DataType>) => {
      const item: DataType = action.payload;
      state.unshift(item);
    },
    updateItem: (state, action: PayloadAction<DataType>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteItem: (state, action: PayloadAction<DataType>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchList.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { createItem, updateItem, deleteItem } = listSlice.actions;

export const selectList = (state: RootState) => state.list;