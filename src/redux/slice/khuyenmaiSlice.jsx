import khuyenmaiService from "../../service/khuyenmaiService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertKhuyenMai = createAsyncThunk(
  "khuyenmai/insertKhuyenMai",
  async (data) => {
    const create = await khuyenmaiService.addKhuyenMai(data);
    return create;
  }
);

export const getlistKhuyenMai = createAsyncThunk(
  "khuyenmai/getlistKhuyenMai",
  async () => {
    const listKhuyenMai = await khuyenmaiService.getListKhuyenMai();
    return listKhuyenMai;
  }
);

export const deleteKhuyenMai = createAsyncThunk(
  "khuyenmai/deleteKhuyenMai",
  async (id) => {
    const nhanvien = await khuyenmaiService.deleteKhuyenMai(id);
    return nhanvien;
  }
);

export const updateKhuyenMai = createAsyncThunk(
  "khuyenmai/updateKhuyenMai",
  async (data) => {
    const updateKhuyenMai = await khuyenmaiService.updateKhuyenMai(
      data?.id,
      data
    );
    return updateKhuyenMai;
  }
);

export const getKhuyenMai = createAsyncThunk(
  "khuyenmai/getKhuyenMai",
  async (id) => {
    const nhanvien = await khuyenmaiService.getDetailKM(id);
    return nhanvien;
  }
);

const khuyenmaiSlice = createSlice({
  name: "khuyenmai",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listKhuyenMai: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getlistKhuyenMai.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getlistKhuyenMai.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getlistKhuyenMai.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listKhuyenMai = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getKhuyenMai.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getKhuyenMai.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getKhuyenMai.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default khuyenmaiSlice;
