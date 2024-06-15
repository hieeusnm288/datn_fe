import brandService from "../../service/brandService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getListBrand = createAsyncThunk(
  "brand/getListBrand",
  async (key) => {
    const listBrand = await brandService.getListBrand(key);
    return listBrand;
  }
);
export const deleteBrand = createAsyncThunk("brand/deleteBrand", async (id) => {
  const deleteBrand = await brandService.deleteBrand(id);
  return deleteBrand;
});

export const insertBrand = createAsyncThunk(
  "brand/insertBrand",
  async (data) => {
    const insertBrand = await brandService.insertBrand(data);
    return insertBrand;
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (data) => {
    const updateBrand = await brandService.updateBrand(data);
    return updateBrand;
  }
);

export const getDetailBrand = createAsyncThunk(
  "brand/getDetailBrand",
  async (id) => {
    const detailBrand = await brandService.getDetailBrand(id);
    return detailBrand;
  }
);
export const getLogoBrand = createAsyncThunk(
  "brand/getLogoBrand",
  async (logo) => {
    const logoBrand = await brandService.getLogoBrand(logo);
    return logoBrand;
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    loadingBrand: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listBrand: [],
    detailBrand: {},
    logoBrand: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListBrand.pending, (state) => {
        state.loadingBrand = true;
      })
      .addCase(getListBrand.rejected, (state) => {
        state.loadingBrand = false;
      })
      .addCase(getListBrand.fulfilled, (state, action) => {
        state.loadingBrand = false;
        state.listBrand = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getDetailBrand.pending, (state) => {
        state.loadingBrand = true;
      })
      .addCase(getDetailBrand.rejected, (state) => {
        state.loadingBrand = false;
      })
      .addCase(getDetailBrand.fulfilled, (state, action) => {
        state.loadingBrand = false;
        state.detailBrand = action.payload;
      })
      .addCase(getLogoBrand.pending, (state) => {
        state.loadingBrand = true;
      })
      .addCase(getLogoBrand.rejected, (state) => {
        state.loadingBrand = false;
      })
      .addCase(getLogoBrand.fulfilled, (state, action) => {
        state.loadingBrand = false;
        state.logoBrand = action.payload;
      });
  },
});

export default brandSlice;
