import trangthaihoadonService from "../../service/trangthaihoadonService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertTrangThai = createAsyncThunk(
  "trangthai/insertTrangThai",
  async (data) => {
    const create = await trangthaihoadonService.addTrangThai(data);
    return create;
  }
);

export const getListTrangThai = createAsyncThunk(
  "trangthai/getListTrangThai",
  async () => {
    const listTrangThai = await trangthaihoadonService.getListTrangThai();
    return listTrangThai;
  }
);

// export const deleteDiaChi = createAsyncThunk(
//   "diachi/deleteDiaChi",
//   async (id) => {
//     const diachi = await diachiService.deleteDiaChi(id);
//     return diachi;
//   }
// );

// export const updateDiaChi = createAsyncThunk(
//   "diachi/updateDiaChi",
//   async (data) => {
//     const updateDiaChi = await diachiService.updateDiaChi(data?.id, data);
//     return updateDiaChi;
//   }
// );
// export const getDiaChi = createAsyncThunk("diachi/getDiaChi", async (id) => {
//   const diachi = await diachiService.getDiaChi(id);
//   return diachi;
// });

const trangthaihoadonSlice = createSlice({
  name: "trangthai",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listTrangThai: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListTrangThai.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListTrangThai.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListTrangThai.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.listTrangThai = action.payload.result;
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

export default trangthaihoadonSlice;
