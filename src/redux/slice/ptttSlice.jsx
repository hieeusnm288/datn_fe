import ptttService from "../../service/ptttService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertPTTT = createAsyncThunk("pttt/insertPTTT", async (data) => {
  const create = await ptttService.addPTTT(data);
  return create;
});

export const getListPTTT = createAsyncThunk("pttt/getListPTTT", async () => {
  const listPTTT = await ptttService.getListPTTT();
  return listPTTT;
});

export const deletePTTT = createAsyncThunk("pttt/deletePTTT", async (id) => {
  const pttt = await ptttService.deletePTTT(id);
  return pttt;
});
export const getPTTT = createAsyncThunk("pttt/getPTTT", async (id) => {
  const pttt = await ptttService.getDetailPTTT(id);
  return pttt;
});

export const updatePTTT = createAsyncThunk("pttt/updatePTTT", async (data) => {
  const updatePTTT = await ptttService.updatePTTT(data?.id, data);
  return updatePTTT;
});

const ptttSlice = createSlice({
  name: "pttt",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listPTTT: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListPTTT.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListPTTT.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListPTTT.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listPTTT = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getPTTT.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getPTTT.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getPTTT.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default ptttSlice;
