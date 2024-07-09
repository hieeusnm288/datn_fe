import mausacService from "../../service/mausacService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertMauSac = createAsyncThunk(
  "mausac/insertMauSac",
  async (data) => {
    const create = await mausacService.AddMauSac(data);
    return create;
  }
);

export const getListMauSac = createAsyncThunk(
  "mausac/getListMauSac",
  async () => {
    const listMauSac = await mausacService.getListMauSac();
    return listMauSac;
  }
);

export const deleteMauSac = createAsyncThunk(
  "mausac/deleteMauSac",
  async (id) => {
    const mausac = await mausacService.deleteMauSac(id);
    return mausac;
  }
);
export const getMauSac = createAsyncThunk("mausac/getMauSac", async (id) => {
  const mausac = await mausacService.getDetailMauSac(id);
  return mausac;
});

export const updateMauSac = createAsyncThunk(
  "mausac/updateMauSac",
  async (data) => {
    const updateMauSac = await mausacService.updateMauSac(data?.id, data);
    return updateMauSac;
  }
);

const mausacSlice = createSlice({
  name: "mausac",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listMauSac: [],
    nhanvienDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListMauSac.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListMauSac.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListMauSac.fulfilled, (state, action) => {
        state.loadingCate = false;
        // console.log(action);
        state.listMauSac = action.payload.result;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getMauSac.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getMauSac.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getMauSac.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default mausacSlice;
