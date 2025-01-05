import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseProductType } from "../../services/Queries/Product/type";

interface ProductsState {
  products: BaseProductType[];
  page: number;
}

const initialState: ProductsState = {
  products: [],
  page: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<BaseProductType[]>) => {
      state.products = action.payload;
    },
    addProducts: (state, action: PayloadAction<BaseProductType[]>) => {
      state.products = [...state.products, ...action.payload];
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
});

export const { setProducts, addProducts, incrementPage } =
  productsSlice.actions;
export default productsSlice.reducer;
