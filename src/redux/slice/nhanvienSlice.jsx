import nhanvienService from "../../service/nhanvienService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertNhanVien = createAsyncThunk(
  "nhanvien/insertNhanVien",
  async (data) => {
    const create = await nhanvienService.addNhanVien(data);
    return create;
  }
);

export const getListNhanVien = createAsyncThunk(
  "nhanvien/getListNhanVien",
  async () => {
    const listNhanVien = await nhanvienService.getListNhanVien();
    return listNhanVien;
  }
);

export const deleteNhanVien = createAsyncThunk(
  "nhanvien/deleteNhanVien",
  async (id) => {
    const nhanvien = await nhanvienService.deleteNhanVien(id);
    return nhanvien;
  }
);
export const getNhanVien = createAsyncThunk(
  "nhanvien/getNhanVien",
  async (id) => {
    const nhanvien = await nhanvienService.getDetailNhanVien(id);
    return nhanvien;
  }
);

export const updateNhanVien = createAsyncThunk(
  "nhanvien/updateNhanVien",
  async (data) => {
    const updateNhanVIen = await nhanvienService.updateNhanVIen(data?.id, data);
    return updateNhanVIen;
  }
);

export const loginNhanVien = createAsyncThunk(
  "nhanvien/loginNhanVien",
  async (data) => {
    const login = await nhanvienService.loginNhanVien(data);
    return login;
  }
);

const nhanvienSlice = createSlice({
  name: "nhanvien",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listNhanVien: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListNhanVien.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListNhanVien.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListNhanVien.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listNhanVien = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getNhanVien.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getNhanVien.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getNhanVien.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default nhanvienSlice;
