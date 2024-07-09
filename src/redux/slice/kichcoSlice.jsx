import kichcoService from "../../service/kichcoService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertKichCo = createAsyncThunk(
  "kichco/insertKichCo",
  async (data) => {
    const create = await kichcoService.addKichCo(data);
    return create;
  }
);

export const getListKichCo = createAsyncThunk(
  "kichco/getListKichCo",
  async () => {
    const listKichCo = await kichcoService.getKichCo();
    return listKichCo;
  }
);

export const deleteKichCo = createAsyncThunk(
  "kichco/deleteKichCo",
  async (id) => {
    const kichco = await kichcoService.deleteKichCo(id);
    return kichco;
  }
);
export const getKichCo = createAsyncThunk("kichco/getKichCo", async (id) => {
  const kichco = await kichcoService.getDetailKichCo(id);
  return kichco;
});

export const updateKichCo = createAsyncThunk(
  "kichco/updateKichCo",
  async (data) => {
    const updateKichCo = await kichcoService.updateKichCo(data?.id, data);
    return updateKichCo;
  }
);

const kichcoSlice = createSlice({
  name: "kichco",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listKichCo: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListKichCo.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListKichCo.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListKichCo.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listKichCo = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getKichCo.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getKichCo.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getKichCo.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default kichcoSlice;
