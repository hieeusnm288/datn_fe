import sanphamService from "../../service/sanphamService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertSanPham = createAsyncThunk(
  "sanpham/insertSanPham",
  async (data) => {
    const create = await sanphamService.addSanPham(data);
    return create;
  }
);

export const getListSanPham = createAsyncThunk(
  "sanpham/getListSanPham",
  async (data) => {
    const listSanPham = await sanphamService.getListSanPham(data);
    return listSanPham;
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

export const getSanPham = createAsyncThunk("sanpham/getSanPham", async (id) => {
  const sanpham = await sanphamService.getSanPham(id);
  return sanpham;
});

const sanphamSlice = createSlice({
  name: "sanpham",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listSanPham: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListSanPham.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListSanPham.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListSanPham.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listSanPham = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getSanPham.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getSanPham.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getSanPham.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default sanphamSlice;
