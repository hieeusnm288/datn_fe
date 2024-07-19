import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const chitietgiohangService = {
  //   getlistDeGiay() {
  //     return axiosLogin.get("/degiay/all");
  //   },
  addGioHangCT(data) {
    return axiosLogin.post("/giohangchitiet/add", data);
  },
  getGioHangCTbyIdGioHang(id) {
    return axiosLogin.get(`giohangchitiet/find?idGioHang=${id}`);
  },
  deleteGioHangCT(id) {
    return axiosLogin.delete(`giohangchitiet/${id}`);
  },
};

export default chitietgiohangService;
