import orderService from "../../service/orderService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getListOrder = createAsyncThunk(
  "order/getListOrder",
  async (key) => {
    const listOrder = await orderService.getListOrder(key);
    return listOrder;
  }
);
export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (id) => {
    const confirmOrder = await orderService.confirmOrder(id);
    return confirmOrder;
  }
);

export const insertOrder = createAsyncThunk(
  "order/insertOrder",
  async (data) => {
    const createOrder = await orderService.createOrder(data);
    return createOrder;
  }
);

export const cancelOrder = createAsyncThunk("order/cancelOrder", async (id) => {
  const cancelOrder = await orderService.cancelOrder(id);
  return cancelOrder;
});

export const getDetailOrder = createAsyncThunk(
  "order/getDetailOrder",
  async (id) => {
    const detailOrder = await orderService.getDetailOrder(id);
    return detailOrder;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loadingOrder: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listOrder: [],
    detailOrder: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListOrder.pending, (state) => {
        state.loadingOrder = true;
      })
      .addCase(getListOrder.rejected, (state) => {
        state.loadingOrder = false;
      })
      .addCase(getListOrder.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.listOrder = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getDetailOrder.pending, (state) => {
        state.loadingOrder = true;
      })
      .addCase(getDetailOrder.rejected, (state) => {
        state.loadingOrder = false;
      })
      .addCase(getDetailOrder.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.detailOrder = action.payload;
      });
  },
});

export default orderSlice;
