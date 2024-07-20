import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const trangthaihoadonService = {
  getListTrangThai(id) {
    return axiosLogin.get(`/trangthaihoadon/all`);
  },
  addTrangThai(data) {
    return axiosLogin.post("/trangthaihoadon/add", data);
  },
};

export default trangthaihoadonService;
