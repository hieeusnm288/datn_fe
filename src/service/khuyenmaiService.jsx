import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const khuyenmaiService = {
  getListKhuyenMai() {
    return axiosLogin.get("/khuyenmai/all");
  },
  getListKhuyenMaiByTrangThai(trangthai) {
    return axiosLogin.get(`/khuyenmai/find?status=${trangthai}`);
  },
  addKhuyenMai(data) {
    return axios.post("/khuyenmai/add", data);
  },
  getDetailKM(id) {
    return axios.get(`khuyenmai/${id}`);
  },
  updateKhuyenMai(id, data) {
    return axios.put(`khuyenmai/${id}`, data);
  },
  deleteKhuyenMai(id) {
    return axios.delete(`khuyenmai/${id}`);
  },
};

export default khuyenmaiService;
