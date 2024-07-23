import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const thongkeService = {
  thongKeDoanhThu(id) {
    return axiosLogin.get(`/thongke/doanh-thu`);
  },
  thongKeHoaDon() {
    return axiosLogin.get("/thongke/tonghoadon");
  },
  thongKeHoaDoHT() {
    return axiosLogin.get("/thongke/tonghoadon-ht");
  },
  thongKeKhachHang() {
    return axiosLogin.get("/thongke/tongkhachhang");
  },
};

export default thongkeService;
