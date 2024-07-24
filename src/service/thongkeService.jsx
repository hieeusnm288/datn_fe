import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const thongkeService = {
  thongKeDoanhThu(id) {
    return axiosLogin.get(`/thongke/doanh-thu`);
  },
  thongKeHoaDonTheoNam(year) {
    return axiosLogin.get(`/thongke/hoadontheonam/${year}`);
  },
  thongKeHoaDonTheoThang(month, year) {
    return axiosLogin.get(
      `/thongke/hoadontheothang/find?month=${month}&year=${year}`
    );
  },
  thongKeHoaDoHTTheoNam(year) {
    return axiosLogin.get(`/thongke/hoadontheonam-ht/${year}`);
  },
  thongKeHoaDoHTTheoThang(month, year) {
    return axiosLogin.get(
      `/thongke/hoadontheothang-ht/find?month=${month}&year=${year}`
    );
  },

  thongKeSanPhamBanChay() {
    return axiosLogin.get("/thongke/sanphambanchay");
  },

  thongKeSanSapHet() {
    return axiosLogin.get("/thongke/sanphamsaphet");
  },

  thongKeKhachHang() {
    return axiosLogin.get("/thongke/tongkhachhang");
  },
};

export default thongkeService;
