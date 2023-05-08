import { configureStore } from "@reduxjs/toolkit";
import Auth from "./sliceAuth";
// STORE
const store = configureStore({
  reducer: {
    auth: Auth,
  },
});

export default store;
