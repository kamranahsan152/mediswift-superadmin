/* eslint-disable import/named */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { paths } from "src/paths";
import { GetToken } from "src/types/global";

interface UserState {
  authToken: string | null;
  role: string | null;
  isAuthenticated: boolean;
}
const initialState: UserState = {
  authToken: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "superadmin",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.authToken = action.payload.authToken;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.authToken = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const logoutUser = () => (dispatch: any) => {
  dispatch(clearUser());
};

export default authSlice.reducer;
