import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const giohangService = {
  //   getlistDeGiay() {
  //     return axiosLogin.get("/degiay/all");
  //   },
  addGioHang(data) {
    return axiosLogin.post("/giohang/add", data);
  },
  getGioHangByUser(id) {
    return axiosLogin.get(`giohang/find?username=${id}`);
  },
};

export default giohangService;
