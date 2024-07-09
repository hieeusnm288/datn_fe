import degiayService from "../../service/degiayService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertDeGiay = createAsyncThunk(
  "degiay/insertDeGiay",
  async (data) => {
    const create = await degiayService.addDeGiay(data);
    return create;
  }
);

export const getListDeGiay = createAsyncThunk(
  "degiay/getListDeGiay",
  async () => {
    const listDeGiay = await degiayService.getlistDeGiay();
    return listDeGiay;
  }
);

export const deleteDeGiay = createAsyncThunk(
  "degiay/deleteDeGiay",
  async (id) => {
    const degiay = await degiayService.deleteDeGiay(id);
    return degiay;
  }
);
export const getDeGiay = createAsyncThunk("degiay/getDeGiay", async (id) => {
  const degiay = await degiayService.getDetailDeGiay(id);
  return degiay;
});

export const updateDeGiay = createAsyncThunk(
  "degiay/updateDeGiay",
  async (data) => {
    const updateDeGiay = await degiayService.updateDeGiay(data?.id, data);
    return updateDeGiay;
  }
);

const degiaySlice = createSlice({
  name: "degiay",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listDeGiay: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListDeGiay.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListDeGiay.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListDeGiay.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listDeGiay = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getDeGiay.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getDeGiay.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getDeGiay.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default degiaySlice;
