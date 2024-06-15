import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../service/productService";

export const insertProduct = createAsyncThunk(
  "product/insertProduct",
  async (data) => {
    const insertProduct = await productService.insertProduct(data);
    return insertProduct;
  }
);

export const getListProduct = createAsyncThunk(
  "product/getListProduct",
  async (param) => {
    const ListProduct = await productService.getListProduct(param);
    return ListProduct;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const deleteProduct = await productService.deleteProduct(id);
    return deleteProduct;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data) => {
    const updateProduct = await productService.updateProduct(data);
    return updateProduct;
  }
);

export const getDetailProduct = createAsyncThunk(
  "product/getDetailProduct",
  async (id) => {
    const detailProduct = await productService.getDetailProduct(id);
    return detailProduct;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loadingProduct: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    ListProduct: [],
    detailProduct: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListProduct.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(getListProduct.rejected, (state) => {
        state.loadingProduct = false;
      })
      .addCase(getListProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.ListProduct = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getDetailProduct.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(getDetailProduct.rejected, (state) => {
        state.loadingProduct = false;
      })
      .addCase(getDetailProduct.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.detailProduct = action.payload;
      });
  },
});
export default productSlice;
