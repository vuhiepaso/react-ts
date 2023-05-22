import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFAuth } from "../interface";
import { APILogin } from "../api/auth";

//API login
export const loginThunk = createAsyncThunk(
  "login/thunk",
  async (params: IFAuth) => {
    const response = await APILogin(params);
    return response.data;
  }
);

export interface InitialStateAuth {
  profile: { username?: string; role?: string; email?: string; id?: number };
  myToke: string;
  isAuth: boolean;
}
let info = [];
if (localStorage.getItem("profile")) {
  info = JSON.parse(localStorage.getItem("profile") || "");
}
const initialState: InitialStateAuth = {
  profile: { ...info },
  myToke: localStorage.getItem("token") + "",
  isAuth: localStorage.getItem("token") ? true : false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.profile = {};
      state.myToke = "";
      state.isAuth = false;
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(loginThunk.pending, (state) => {
    // });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const { data, status } = action.payload;

      if (status === "200") {
        state.profile = data.info;
        state.myToke = data.token;
        state.isAuth = true;
        localStorage.setItem("profile", JSON.stringify(data.info));
        localStorage.setItem("token", `Token ${data.token}`);
      }
    });
    // builder.addCase(loginThunk.rejected, (state, action) => {
    //   console.log("rejected", action);
    // });
  },
});
const { reducer, actions } = authSlice;
export const { logoutAction } = actions; // Actions
export default reducer;
