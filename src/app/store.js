import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import appReducer from "../store/appSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
