import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const sanphamService = {
  getListSanPham(data) {
    return axiosLogin.get(
      `/sanpham/search?name=${data.name}&trangthai=${data.status}&idThuongHieu=${data.thuongHieu}`
    );
  },
  addSanPham(data) {
    return axios.post("/sanpham/add", data);
  },
  getSanPham(id) {
    return axiosLogin.get(`sanpham/${id}`);
  },
  //   updateKhuyenMai(id, data) {
  //     return axios.put(`khuyenmai/${id}`, data);
  //   },
  //   deleteKhuyenMai(id) {
  //     return axios.delete(`khuyenmai/${id}`);
  //   },
};

export default sanphamService;
