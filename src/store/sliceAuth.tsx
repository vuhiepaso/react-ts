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
    logoutAction: (state) => {
      state = {
        profile: {},
        myToke: "",
        isAuth: false,
      };
      // localStorage.removeItem('token')
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
export const { logoutAction } = actions; // Actions
export default reducer;
