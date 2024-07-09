import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const nhanvienService = {
  getListNhanVien(key) {
    return axios.get("/nhanvien/all");
  },
  addNhanVien(data) {
    return axios.post("/nhanvien/add", data);
  },
  getDetailNhanVien(id) {
    return axios.get(`nhanvien/${id}`);
  },
  updateNhanVIen(id, data) {
    return axios.put(`nhanvien/${id}`, data);
  },
  deleteNhanVien(id) {
    return axios.delete(`nhanvien/${id}`);
  },
  loginNhanVien(data) {
    return axiosLogin.post(`nhanvien/login`, data);
  },
};

export default nhanvienService;
