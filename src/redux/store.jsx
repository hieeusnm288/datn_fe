import { configureStore } from "@reduxjs/toolkit";
import brandSlice from "./slice/brandSlice";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
import accountSlice from "./slice/accountSlice";
import orderSlice from "./slice/orderSlice";
import nhanvienSlice from "./slice/nhanvienSlice";
import khuyenmaiSlice from "./slice/khuyenmaiSlice";
import degiaySlice from "./slice/degiaySlice";
import kichcoService from "../service/kichcoService";
import kichcoSlice from "./slice/kichcoSlice";
import mausacSlice from "./slice/mausacSlice";
import ptttSlice from "./slice/ptttSlice";
import khachhangSlice from "./slice/khachhangSlice";
import sanphamSlice from "./slice/sanphamSlice";
import chitietsanphamSlice from "./slice/chitietsanphamSlice";
import hinhAnhSlice from "./slice/hinhAnhSlice";
import giohangSlice from "./slice/giohangSlice";
import chitietgiohangSlice from "./slice/chitietgiohangSlice";
import diachiSlice from "./slice/diachiSlice";
import donHangSlice from "./slice/donHangSlice";
import donHangCTSlice from "./slice/donhangchitietSlice";
import trangthaihoadonSlice from "./slice/trangthaihoadonSlice";
import thongkeSlice from "./slice/thongkeSlice";

const store = configureStore({
  reducer: {
    brand: brandSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    account: accountSlice.reducer,
    order: orderSlice.reducer,
    nhanvien: nhanvienSlice.reducer,
    khuyenmai: khuyenmaiSlice.reducer,
    degiay: degiaySlice.reducer,
    kichco: kichcoSlice.reducer,
    mausac: mausacSlice.reducer,
    pttt: ptttSlice.reducer,
    khachhang: khachhangSlice.reducer,
    sanpham: sanphamSlice.reducer,
    chitietsanpham: chitietsanphamSlice.reducer,
    hinhanh: hinhAnhSlice.reducer,
    giohang: giohangSlice.reducer,
    giohangct: chitietgiohangSlice.reducer,
    diachi: diachiSlice.reducer,
    donhang: donHangSlice.reducer,
    donhangct: donHangCTSlice.reducer,
    trangthai: trangthaihoadonSlice.reducer,
    thongke: thongkeSlice.reducer,
  },
});
export default store;
