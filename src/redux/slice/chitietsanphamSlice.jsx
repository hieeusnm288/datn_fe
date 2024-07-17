import chitietsanphamService from "../../service/chitietsanphamService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertCTSanPham = createAsyncThunk(
  "chitietsanpham/insertCTSanPham",
  async (data) => {
    const create = await chitietsanphamService.addChiTietSanPham(data);
    return create;
  }
);

export const getListCTSanPham = createAsyncThunk(
  "chitietsanpham/getListCTSanPham",
  async (trangthai) => {
    const listCTSanPham = await chitietsanphamService.getListChiTietSanPham(
      trangthai
    );
    return listCTSanPham;
  }
);

// export const deleteKhuyenMai = createAsyncThunk(
//   "khuyenmai/deleteKhuyenMai",
//   async (id) => {
//     const nhanvien = await khuyenmaiService.deleteKhuyenMai(id);
//     return nhanvien;
//   }
// );

// export const updateKhuyenMai = createAsyncThunk(
//   "khuyenmai/updateKhuyenMai",
//   async (data) => {
//     const updateKhuyenMai = await khuyenmaiService.updateKhuyenMai(
//       data?.id,
//       data
//     );
//     return updateKhuyenMai;
//   }
// );

// export const getKhuyenMai = createAsyncThunk(
//   "khuyenmai/getKhuyenMai",
//   async (id) => {
//     const nhanvien = await khuyenmaiService.getDetailKM(id);
//     return nhanvien;
//   }
// );

const chitietsanphamSlice = createSlice({
  name: "chitietsanpham",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listCTSanPham: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListCTSanPham.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListCTSanPham.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListCTSanPham.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listSanPham = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      });
    //   .addCase(getKhuyenMai.pending, (state) => {
    //     state.loadingCate = true;
    //   })
    //   .addCase(getKhuyenMai.rejected, (state) => {
    //     state.loadingCate = false;
    //   })
    //   .addCase(getKhuyenMai.fulfilled, (state, action) => {
    //     state.loadingCate = false;
    //     state.categoryDetail = action.payload;
    //   });
  },
});

export default chitietsanphamSlice;
