import diachiService from "../../service/diachiService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertDiaChi = createAsyncThunk(
  "diachi/insertDiaChi",
  async (data) => {
    console.log("slice: ", data);
    const create = await diachiService.addDiaChi(data);
    return create;
  }
);

export const getListDiaChi = createAsyncThunk(
  "diachi/getListDiaChi",
  async (id) => {
    const listDiaChi = await diachiService.getlistDiaChi(id);
    return listDiaChi;
  }
);

export const deleteDiaChi = createAsyncThunk(
  "diachi/deleteDiaChi",
  async (id) => {
    const diachi = await diachiService.deleteDiaChi(id);
    return diachi;
  }
);

export const updateDiaChi = createAsyncThunk(
  "diachi/updateDiaChi",
  async (data) => {
    const updateDiaChi = await diachiService.updateDiaChi(data?.id, data);
    return updateDiaChi;
  }
);

const diachiSlice = createSlice({
  name: "diachi",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listDiaChi: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListDiaChi.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListDiaChi.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListDiaChi.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.listDiaChi = action.payload.result;
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

export default diachiSlice;
