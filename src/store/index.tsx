import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import Auth from "./sliceAuth";
// STORE
const store = configureStore({
  reducer: {
    auth: Auth,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
