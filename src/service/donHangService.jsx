import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const donHangService = {
  getListDonHangByKhachHang(id) {
    return axiosLogin.get(`/hoadon/find?idKhachHang=${id}`);
  },
  getListDonHangAll(id) {
    return axiosLogin.get(`/hoadon/all`);
  },
  addDonHang(data) {
    return axiosLogin.post("/hoadon/add", data);
  },
  updateDonHang(id, data) {
    return axiosLogin.put(`hoadon/${id}`, data);
  },
};

export default donHangService;
