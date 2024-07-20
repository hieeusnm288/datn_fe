import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const donhangchitietService = {
  getListDonHangCT(id) {
    return axiosLogin.get(`/chitiethoadon/find?idHoaDon=${id}`);
  },
  addDonHangCT(data) {
    return axiosLogin.post("/chitiethoadon/add", data);
  },
};

export default donhangchitietService;
