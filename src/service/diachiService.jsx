import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const diachiService = {
  getlistDiaChi(id) {
    return axiosLogin.get(`/diachi/find?idKhachHang=${id}`);
  },
  addDiaChi(data) {
    return axiosLogin.post("/diachi/add", data);
  },
  updateDiaChi(id, data) {
    return axiosLogin.put(`diachi/${id}`, data);
  },
  deleteDiaChi(id) {
    return axiosLogin.delete(`diachi/${id}`);
  },
};

export default diachiService;
