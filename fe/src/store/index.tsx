import { configureStore } from "@reduxjs/toolkit";
import { listSlice } from "./list";
import { loginSlice } from "./login"

export const store = configureStore({
  reducer: {
    list: listSlice.reducer,
    login: loginSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
