import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    setLogin: (state, action: PayloadAction<void>) => {
      return !state;
    }
  },
});

export const { setLogin } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;