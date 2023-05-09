import { createSlice, Slice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFAuth } from "../interface";
import { APILogin } from "../api/auth";

//API login
export const loginThunk: any = createAsyncThunk(
  "login/thunk",
  async (params: IFAuth) => {
    const response = await APILogin(params);
    return response.data;
  }
);

const authSlice: Slice = createSlice({
  name: "auth",
  initialState: {
    profile: {},
    myToke: {},
  },
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

      if (status === 200) {
        state.profile = data.info;
        state.myToke = data.token;
        localStorage.setItem("token", data.token);
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