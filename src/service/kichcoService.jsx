import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const kichcoService = {
  getKichCo() {
    return axiosLogin.get("/kichco/all");
  },
  addKichCo(data) {
    return axios.post("/kichco/add", data);
  },
  getDetailKichCo(id) {
    return axios.get(`kichco/${id}`);
  },
  getDetailKichCoByName(name) {
    return axios.get(`/kichco/find?name=${name}`);
  },
  updateKichCo(id, data) {
    return axios.put(`kichco/${id}`, data);
  },
  deleteKichCo(id) {
    return axios.delete(`kichco/${id}`);
  },
};

export default kichcoService;
