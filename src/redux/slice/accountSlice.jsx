import accountService from "../../service/accountService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerAccount = createAsyncThunk(
  "account/registerAccount",
  async (data) => {
    const create = await accountService.registerAccount(data);
    return create;
  }
);

export const getListAccount = createAsyncThunk(
  "account/getListAccount",
  async (pargam) => {
    const listAccount = await accountService.getListAccount(pargam);
    return listAccount;
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (id) => {
    const account = await accountService.deleteAccount(id);
    return account;
  }
);
export const detailAccount = createAsyncThunk(
  "account/detailAccount",
  async (id) => {
    const account = await accountService.detailAccount(id);
    return account;
  }
);

export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  async (data) => {
    const accountUpdatw = await accountService.updateAccount(data);
    return accountUpdatw;
  }
);

export const loginAccount = createAsyncThunk(
  "account/loginAccount",
  async (data) => {
    const loginAccount = await accountService.loginAccount(data);
    return loginAccount;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    loadingAccount: false,
    totalPages: 0,
    totalElements: 0,
    number: 0,
    listAccount: [],
    accountDetail: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListAccount.pending, (state) => {
        state.loadingAccount = true;
      })
      .addCase(getListAccount.rejected, (state) => {
        state.loadingAccount = false;
      })
      .addCase(getListAccount.fulfilled, (state, action) => {
        state.loadingAccount = false;
        state.listAccount = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.number = action.payload.number;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loadingAccount = true;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.loadingAccount = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loadingAccount = false;
        state.accountDetail = action.payload;
      });
  },
});

export default accountSlice;
