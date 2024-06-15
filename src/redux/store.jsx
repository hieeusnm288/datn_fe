import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slice/categorySlice";
import brandSlice from "./slice/brandSlice";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
import accountSlice from "./slice/accountSlice";
import orderSlice from "./slice/orderSlice";

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    brand: brandSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    account: accountSlice.reducer,
    order: orderSlice.reducer,
  },
});
export default store;
