import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const sanphamService = {
  getListSanPham(data) {
    return axiosLogin.get(
      `/sanpham/search?name=${data.name}&trangthai=${data.status}&idThuongHieu=${data.thuongHieu}&page=${data.page}&size=8`
    );
  },
  addSanPham(data) {
    return axios.post("/sanpham/add", data);
  },
  getSanPham(id) {
    return axiosLogin.get(`sanpham/${id}`);
  },
  updateSanPham(id, data) {
    return axios.put(`sanpham/${id}`, data);
  },
  //   deleteKhuyenMai(id) {
  //     return axios.delete(`khuyenmai/${id}`);
  //   },
};

export default sanphamService;
