import khachhangService from "../../service/khachhangService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertKhachHang = createAsyncThunk(
  "khachhang/insertKhachHang",
  async (data) => {
    const create = await khachhangService.addKhachHang(data);
    return create;
  }
);

export const getListKhachHang = createAsyncThunk(
  "khachhang/getListKhachHang",
  async () => {
    const listKhachHang = await khachhangService.getListKhachHang();
    return listKhachHang;
  }
);

export const deleteKhachHang = createAsyncThunk(
  "khachhang/deleteKhachHang",
  async (id) => {
    const khachhang = await khachhangService.deleteKhachHang(id);
    return khachhang;
  }
);
export const getKhachHang = createAsyncThunk(
  "khachhang/getKhachHang",
  async (id) => {
    const khachhang = await khachhangService.getDetailKhachHang(id);
    return khachhang;
  }
);
export const getKhachHangByUsername = createAsyncThunk(
  "khachhang/getKhachHangByUsername",
  async (username) => {
    const khachhang = await khachhangService.getDetailNhanVienByUsername(
      username
    );
    return khachhang;
  }
);
export const updateKhachHang = createAsyncThunk(
  "khachhang/updateKhachHang",
  async (data) => {
    const updateKhachHang = await khachhangService.updateKhachHang(
      data?.id,
      data
    );
    return updateKhachHang;
  }
);

export const loginKhachHang = createAsyncThunk(
  "nhanvien/loginKhachHang",
  async (data) => {
    const login = await khachhangService.loginKhachHang(data);
    return login;
  }
);

const khachhangSlice = createSlice({
  name: "khachhang",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listKhachHang: [],
    khachhangDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListKhachHang.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListKhachHang.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListKhachHang.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listKhachHang = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getKhachHang.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getKhachHang.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getKhachHang.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default khachhangSlice;
