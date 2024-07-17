import hinhanhService from "../../service/hinhanhService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const inserHinhAnh = createAsyncThunk(
  "hinhanh/inserHinhAnh",
  async (data) => {
    const create = await hinhanhService.addHinhAnh(data);
    return create;
  }
);

export const getListHinhAnh = createAsyncThunk(
  "hinhanh/getListHinhAnh",
  async () => {
    const listHinhAnh = await hinhanhService.getListHinhAnh();
    return listHinhAnh;
  }
);

// export const deleteDeGiay = createAsyncThunk(
//   "degiay/deleteDeGiay",
//   async (id) => {
//     const degiay = await degiayService.deleteDeGiay(id);
//     return degiay;
//   }
// );
// export const getDeGiay = createAsyncThunk("degiay/getDeGiay", async (id) => {
//   const degiay = await degiayService.getDetailDeGiay(id);
//   return degiay;
// });

// export const updateDeGiay = createAsyncThunk(
//   "degiay/updateDeGiay",
//   async (data) => {
//     const updateDeGiay = await degiayService.updateDeGiay(data?.id, data);
//     return updateDeGiay;
//   }
// );

const hinhAnhSlice = createSlice({
  name: "hinhanh",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listHinhAnh: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListHinhAnh.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListHinhAnh.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListHinhAnh.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listHinhAnh = action.payload.result;
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

export default hinhAnhSlice;
