import { createSlice, Slice, createAsyncThunk } from "@reduxjs/toolkit";
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
  profile: object;
  myToke: string;
  isAuth: boolean;
}

const initialState: InitialStateAuth = {
  profile: {},
  myToke: "",
  isAuth: false,
};
const authSlice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.profile = action.payload;
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
        // localStorage.setItem("token", data.token);
      }
    });
    // builder.addCase(loginThunk.rejected, (state, action) => {
    //   console.log("rejected", action);
    // });
  },
});
const { reducer, actions } = authSlice;
export const { loginAction } = actions; // Actions
export default reducer;
