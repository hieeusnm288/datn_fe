import donhangchitietService from "../../service/donhangchitietService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertDonHangCT = createAsyncThunk(
  "donhangct/insertDonHangCT",
  async (data) => {
    console.log("slice: ", data);
    const create = await donhangchitietService.addDonHangCT(data);
    return create;
  }
);

export const getListDonHangCT = createAsyncThunk(
  "donhangct/getListDonHangCT",
  async (id) => {
    const listDonHangCT = await donhangchitietService.getListDonHangCT(id);
    return listDonHangCT;
  }
);

// export const getListDonHangById = createAsyncThunk(
//   "donhang/getListDonHangById",
//   async (id) => {
//     const listDonHang = await donhangchitietService.getListDonHangByKhachHang(
//       id
//     );
//     return listDonHang;
//   }
// );

// export const updateDonHang = createAsyncThunk(
//   "donhang/updateDonHang",
//   async (data) => {
//     const diachi = await donhangchitietService.updateDonHang(data.id, data);
//     return diachi;
//   }
// );

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

const donHangCTSlice = createSlice({
  name: "donhangct",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listDonHangCT: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListDonHangCT.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListDonHangCT.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListDonHangCT.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.listDonHangCT = action.payload.result;
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

export default donHangCTSlice;
