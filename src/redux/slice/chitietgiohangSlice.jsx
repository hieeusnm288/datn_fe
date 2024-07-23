import chitietgiohangService from "../../service/chitietgiohangService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertGioHangCT = createAsyncThunk(
  "giohangct/insertGioHangCT",
  async (data) => {
    const create = await chitietgiohangService.addGioHangCT(data);
    return create;
  }
);

export const getListGioCT = createAsyncThunk(
  "giohangct/getListGioCT",
  async (id) => {
    const listGioHangCT = await chitietgiohangService.getGioHangCTbyIdGioHang(
      id
    );
    return listGioHangCT;
  }
);

export const deleteGioHangCT = createAsyncThunk(
  "giohangct/deleteGioHangCT",
  async (id) => {
    const giohangct = await chitietgiohangService.deleteGioHangCT(id);
    return giohangct;
  }
);
export const deleteAll = createAsyncThunk("giohang/deleteAll", async (id) => {
  const giohangct = await chitietgiohangService.deleteAllGioHangCT(id);
  return giohangct;
});

export const updateGioHangCT = createAsyncThunk(
  "giohangct/updateGioHangCT",
  async (data) => {
    const updateGioHang = await chitietgiohangService.updateGioHangCT(
      data?.id,
      data
    );
    return updateGioHang;
  }
);

const chitietgiohangSlice = createSlice({
  name: "giohangct",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listGioHangCT: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListGioCT.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListGioCT.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListGioCT.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listGioHangCT = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      });
    //   .addCase(getGioHangCTbyIdGioHang.pending, (state) => {
    //     state.loadingCate = true;
    //   })
    //   .addCase(getGioHangCTbyIdGioHang.rejected, (state) => {
    //     state.loadingCate = false;
    //   })
    //   .addCase(getGioHangCTbyIdGioHang.fulfilled, (state, action) => {
    //     state.loadingCate = false;
    //     state.categoryDetail = action.payload;
    //   });
  },
});

export default chitietgiohangSlice;
