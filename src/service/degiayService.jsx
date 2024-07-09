import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const degiayService = {
  getlistDeGiay() {
    return axiosLogin.get("/degiay/all");
  },
  addDeGiay(data) {
    return axios.post("/degiay/add", data);
  },
  getDetailDeGiay(id) {
    return axios.get(`degiay/${id}`);
  },
  updateDeGiay(id, data) {
    return axios.put(`degiay/${id}`, data);
  },
  deleteDeGiay(id) {
    return axios.delete(`degiay/${id}`);
  },
};

export default degiayService;
