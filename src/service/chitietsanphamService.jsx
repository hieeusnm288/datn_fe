import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const chitietsanphamService = {
  getListChiTietSanPham(idSanPham) {
    return axiosLogin.get(`/sanpham/search?idSanPham=${idSanPham}`);
  },
  addChiTietSanPham(data) {
    return axios.post("/chitietsanpham/add", data);
  },
  //   getDetailKM(id) {
  //     return axios.get(`khuyenmai/${id}`);
  //   },
  //   updateKhuyenMai(id, data) {
  //     return axios.put(`khuyenmai/${id}`, data);
  //   },
  //   deleteKhuyenMai(id) {
  //     return axios.delete(`khuyenmai/${id}`);
  //   },
};

export default chitietsanphamService;
