import categoryService from "../../service/categoryService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertCategory = createAsyncThunk(
  "category/insertCategory",
  async (data) => {
    const create = await categoryService.insertCategory(data);
    return create;
  }
);

export const getListCate = createAsyncThunk(
  "category/getListCate",
  async (page) => {
    const listCategory = await categoryService.getListCate(page);
    return listCategory;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    const category = await categoryService.deleteCategory(id);
    return category;
  }
);
export const getCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    const category = await categoryService.getCategory(id);
    return category;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data) => {
    const categoryUpdate = await categoryService.updateCategory(data);
    return categoryUpdate;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loadingCate: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listCategory: [],
    categoryDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListCate.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getListCate.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getListCate.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.listCategory = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getCategory.pending, (state) => {
        state.loadingCate = true;
      })
      .addCase(getCategory.rejected, (state) => {
        state.loadingCate = false;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loadingCate = false;
        state.categoryDetail = action.payload;
      });
  },
});

export default categorySlice;
