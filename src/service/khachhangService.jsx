import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const khachhangService = {
  getListKhachHang() {
    return axios.get("/khachhang/all");
  },
  addKhachHang(data) {
    return axios.post("/khachhang/add", data);
  },
  getDetailKhachHang(id) {
    return axios.get(`khachhang/${id}`);
  },
  getDetailNhanVienByUsername(usernmae) {
    return axiosLogin.get(`khachhang/detail/${usernmae}`);
  },
  updateKhachHang(id, data) {
    return axios.put(`khachhang/${id}`, data);
  },
  deleteKhachHang(id) {
    return axios.delete(`khachhang/${id}`);
  },
  loginKhachHang(data) {
    return axiosLogin.post(`khachhang/login`, data);
  },
};

export default khachhangService;
