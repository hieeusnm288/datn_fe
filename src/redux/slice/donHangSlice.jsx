import donHangService from "../../service/donHangService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertDonHang = createAsyncThunk(
  "donhang/insertDonHang",
  async (data) => {
    console.log("slice: ", data);
    const create = await donHangService.addDonHang(data);
    return create;
  }
);

export const getListDonHang = createAsyncThunk(
  "donhang/getListDonHang",
  async (data) => {
    const listDonHang = await donHangService.getListDonHangAll(data);
    return listDonHang;
  }
);

export const getListDonHangById = createAsyncThunk(
  "donhang/getListDonHangById",
  async (id) => {
    const listDonHang = await donHangService.getListDonHangByKhachHang(id);
    return listDonHang;
  }
);

export const updateDonHang = createAsyncThunk(
  "donhang/updateDonHang",
  async (data) => {
    const diachi = await donHangService.updateDonHang(data.id, data);
    return diachi;
  }
);

// export const updateDiaChi = createAsyncThunk(
//   "diachi/updateDiaChi",
//   async (data) => {
//     const updateDiaChi = await donHangService.updateDiaChi(data?.id, data);
//     return updateDiaChi;
//   }
// );
// export const getDiaChi = createAsyncThunk("diachi/getDiaChi", async (id) => {
//   const diachi = await donHangService.getDiaChi(id);
//   return diachi;
// });

const donHangSlice = createSlice({
  name: "donhang",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listDonHang: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListDonHang.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListDonHang.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListDonHang.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.listDonHang = action.payload.result.content;
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

export default donHangSlice;
