import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const chitietsanphamService = {
  getListChiTietSanPham(idSanPham) {
    return axiosLogin.get(`/chitietsanpham/search?idSanPham=${idSanPham}`);
  },
  addChiTietSanPham(data) {
    return axios.post("/chitietsanpham/add", data);
  },
  getDetailChiTietSP(data) {
    return axiosLogin.get(
      `/chitietsanpham/find?idSanPham=${data.idSanPham}&idKichThuoc=${data.idKichThuoc}&idMauSac=${data.idMauSac}`
    );
  },
  updateChiTietSanPham(id, data) {
    return axios.put(`chitietsanpham/${id}`, data);
  },
  //   deleteKhuyenMai(id) {
  //     return axios.delete(`khuyenmai/${id}`);
  //   },
};

export default chitietsanphamService;
