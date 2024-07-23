import thongkeService from "../../service/thongkeService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDoanhThu = createAsyncThunk("thongke/getDoanhThu", async () => {
  const doanhthu = await thongkeService.thongKeDoanhThu();
  return doanhthu;
});

export const getTongHoaDon = createAsyncThunk(
  "thongke/getTongHoaDon",
  async () => {
    const tonghoadon = await thongkeService.thongKeHoaDon();
    return tonghoadon;
  }
);

export const getTongHoaDonHT = createAsyncThunk(
  "thongke/getTongHoaDonHT",
  async () => {
    const tonghoadon = await thongkeService.thongKeHoaDoHT();
    return tonghoadon;
  }
);

export const getTongKhachHnang = createAsyncThunk(
  "thongke/getTongKhachHnang",
  async () => {
    const tonghoadon = await thongkeService.thongKeKhachHang();
    return tonghoadon;
  }
);

const thongkeSlice = createSlice({
  name: "thongke",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    doanhthu: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoanhThu.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getDoanhThu.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getDoanhThu.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.doanhthu = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      });
    //   .addCase(getDeGiay.pending, (state) => {
    //     state.loadingCate = true;
    //   })
    //   .addCase(getDeGiay.rejected, (state) => {
    //     state.loadingCate = false;
    //   })
    //   .addCase(getDeGiay.fulfilled, (state, action) => {
    //     state.loadingCate = false;
    //     state.categoryDetail = action.payload;
    //   });
  },
});

export default thongkeSlice;
