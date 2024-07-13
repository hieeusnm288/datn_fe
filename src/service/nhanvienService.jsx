import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const nhanvienService = {
  getListNhanVien() {
    return axios.get("/nhanvien/all");
  },
  addNhanVien(data) {
    return axios.post("/nhanvien/add", data);
  },
  getDetailNhanVien(id) {
    return axios.get(`nhanvien/${id}`);
  },
  getDetailNhanVienByUsername(usernmae) {
    return axiosLogin.get(`nhanvien/detail/${usernmae}`);
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
