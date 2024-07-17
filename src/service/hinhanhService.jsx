import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const hinhanhService = {
  addHinhAnh(data) {
    let formData = new FormData();
    formData.append("idChiTietSanPham", data.idChiTietSanPham);
    formData.append("trangthai", data.trangthai);
    if (data.logoFile[0].originFileObj) {
      formData.append("logoFile", data.logoFile[0].originFileObj);
    }
    return axios.post("/hinhanh/add", formData);
  },
  getListHinhAnh(id) {
    return axiosLogin.get(`/hinhanh/${id}`);
  },
};

export default hinhanhService;
