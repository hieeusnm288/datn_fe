import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";

const khachhangService = {
  getListKhachHang() {
    return axios.get("/khachhang/all");
  },
  addKhachHang(data) {
    return axiosLogin.post("/khachhang/add", data);
  },
  getDetailKhachHang(id) {
    return axiosLogin.get(`khachhang/${id}`);
  },
  getDetailNhanVienByUsername(usernmae) {
    return axiosLogin.get(`khachhang/detail/${usernmae}`);
  },
  updateKhachHang(id, data) {
    return axiosLogin.put(`khachhang/${id}`, data);
  },
  deleteKhachHang(id) {
    return axios.delete(`khachhang/${id}`);
  },
  loginKhachHang(data) {
    return axiosLogin.post(`khachhang/login`, data);
  },
};

export default khachhangService;
