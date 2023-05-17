import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ItemProductCart } from "../page/cart";

const localProduct = JSON.parse(localStorage.getItem("cartProduct") + "" || "");
const productCart = createSlice({
  name: "cart",
  initialState: {
    products: (localProduct || []) as ItemProductCart[],
  },
  reducers: {
    addToCart: (state, action: PayloadAction<ItemProductCart>) => {
      const index = state.products.findIndex(
        (prd) => prd.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index].numberOder += action.payload.numberOder;
      } else {
        state.products = [...state.products, action.payload];
      }
      localStorage.setItem("cartProduct", JSON.stringify(state.products));
    },
    removeCart: (state, action: PayloadAction<ItemProductCart>) => {
      const products = JSON.parse(JSON.stringify(state.products));
      state.products = filterProduct(products, action.payload);
      localStorage.setItem("cartProduct", JSON.stringify(state.products));
    },
    updateQuantity: (state, action: PayloadAction<ItemProductCart>) => {
      const { payload } = action;
      const index = state.products.findIndex((prd) => prd.id === payload.id);
      state.products[index] = payload;

      localStorage.setItem("cartProduct", JSON.stringify(state.products));
    },
  },
});

const filterProduct = (list: ItemProductCart[], product: ItemProductCart) =>
  list.filter((prd) => prd.id !== product.id);

const { reducer, actions } = productCart;
export const { addToCart, removeCart, updateQuantity } = actions; // Actions
export default reducer;
