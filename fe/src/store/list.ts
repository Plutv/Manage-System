import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./index";

import DataType from '../../types'

const initialList: DataType[] = [];


// A mock function to mimic making an async request for data
const initList = () => axios.get("/api/stu/list", {
    params: {
      pageindex: 1,
      pagesize: 5,
    },
  });

export const fetchList = createAsyncThunk(
  'list/initList',
  async () => {
    const res = await initList();
    return res.data.list;
  }
)

export const addItem = createAsyncThunk<any, DataType>(
  'list/addItem', 
  async (data) => {
    const res = await axios.post("/api/stu/create", data);
    if(res.data.code === 1){
      console.log("创建成功", res);
    }
    console.log("创建新用户", res);
    return res.data.item;
  }
)

export const updateItem = createAsyncThunk<any, DataType>(
  'list/updateItem', 
  async (data) => {
    await axios.post("/api/stu/update", data);
    return data;
  }
)

export const deleteItem = createAsyncThunk<any, any>(
  'list/deleteItem',
  async (id) => {
    axios.post("/api/stu/delete", { id });
    return id;
  }
)
export const listSlice = createSlice({
  name: "list",
  initialState: initialList,
  reducers: {
    // createItem: (state, action: PayloadAction<DataType>) => {
    //   const item: DataType = action.payload;
    //   state.unshift(item);
    // },
    // updateItem: (state, action: PayloadAction<DataType>) => {
    //   const index = state.findIndex((item) => item.id === action.payload.id);
    //   state[index] = action.payload;
    // },
    // deleteItem: (state, action: PayloadAction<String>) => {
    //   const index = state.findIndex((item) => item.id === action.payload);
    //   state.splice(index, 1);
    // }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchList.fulfilled, (state, action) => {
      return action.payload;
    })
    .addCase(addItem.fulfilled, (state, action) => {
      const item: DataType = action.payload;
      state.unshift(item)
      return state;
    })
    .addCase(updateItem.fulfilled, (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;
    })
    .addCase(deleteItem.fulfilled, (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    })
  },
});

export const selectList = (state: RootState) => state.list;