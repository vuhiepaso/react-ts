import { createSlice, Slice, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "../interface";

//API login
export const loginThunk: any = createAsyncThunk(
  "login/thunk",
  async (params: Auth) => {
    const API = params;
    return API;
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
    builder.addCase(loginThunk.pending, (state) => {
      //   console.log("pending", state);
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log("fulfilled", state, action);
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      //   console.log("rejected", state, action);
    });
  },
});
const { reducer, actions } = authSlice;
export const { loginAction } = actions; // Actions
export default reducer;
