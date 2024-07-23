import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const donHangService = {
  getListDonHangByKhachHang(id) {
    return axiosLogin.get(`/hoadon/find?idKhachHang=${id}`);
  },
  getListDonHangAll(data) {
    return axiosLogin.get(
      `/hoadon/search?username=${data.username}&idTrangThai=${data.idTrangThai}&page=${data.page}&size=8`
    );
  },
  addDonHang(data) {
    return axiosLogin.post("/hoadon/add", data);
  },
  updateDonHang(id, data) {
    return axiosLogin.put(`hoadon/${id}`, data);
  },
};

export default donHangService;
