import giohangService from "../../service/giohangService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertGioHang = createAsyncThunk(
  "giohang/insertGioHang",
  async (data) => {
    const create = await giohangService.addGioHang(data);
    return create;
  }
);

// export const getListDeGiay = createAsyncThunk(
//   "degiay/getListDeGiay",
//   async () => {
//     const listDeGiay = await degiayService.getlistDeGiay();
//     return listDeGiay;
//   }
// );

// export const deleteDeGiay = createAsyncThunk(
//   "degiay/deleteDeGiay",
//   async (id) => {
//     const degiay = await degiayService.deleteDeGiay(id);
//     return degiay;
//   }
// );
export const getGioHang = createAsyncThunk("giohang/getGioHang", async (id) => {
  const giohang = await giohangService.getGioHangByUser(id);
  return giohang;
});

// export const updateDeGiay = createAsyncThunk(
//   "degiay/updateDeGiay",
//   async (data) => {
//     const updateDeGiay = await degiayService.updateDeGiay(data?.id, data);
//     return updateDeGiay;
//   }
// );

const giohangSlice = createSlice({
  name: "giohang",
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
      //   .addCase(getListDeGiay.pending, (state) => {
      //     state.loadingCate = true;
      //   })
      //   .addCase(getListDeGiay.rejected, (state) => {
      //     state.loadingCate = false;
      //   })
      //   .addCase(getListDeGiay.fulfilled, (state, action) => {
      //     state.loadingCate = false;
      //     // console.log(action);
      //     state.listDeGiay = action.payload.result;
      //     state.totalPages = action.payload.totalPages;
      //     state.number = action.payload.number;
      //     state.totalElements = action.payload.totalElements;
      //   })
      .addCase(getGioHang.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getGioHang.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getGioHang.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default giohangSlice;
