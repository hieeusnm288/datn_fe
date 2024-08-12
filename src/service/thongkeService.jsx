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
  thongKeHoaDonTheoThang(start, end) {
    return axiosLogin.get(
      `/thongke/hoadontheothang/find?startDate=${start}&endDate=${end}`
    );
  },
  thongKeHoaDoHTTheoNam(year) {
    return axiosLogin.get(`/thongke/hoadontheonam-ht/${year}`);
  },
  thongKeHoaDoHTTheoThang(start, end) {
    return axiosLogin.get(
      `/thongke/hoadontheothang-ht/find?startDate=${start}&endDate=${end}`
    );
  },

  thongKeSanPhamBanChay(month, year) {
    return axiosLogin.get(
      `/thongke/sanphambanchay/find?month=${month}&year=${year}`
    );
  },

  thongKeSanSapHet() {
    return axiosLogin.get("/thongke/sanphamsaphet");
  },

  thongKeKhachHang() {
    return axiosLogin.get("/thongke/tongkhachhang");
  },
};

export default thongkeService;
