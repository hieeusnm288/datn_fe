import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const mausacService = {
  getListMauSac() {
    return axiosLogin.get("/mausac/all");
  },
  AddMauSac(data) {
    return axios.post("/mausac/add", data);
  },
  getDetailMauSac(id) {
    return axios.get(`mausac/${id}`);
  },
  getDetailMauSacByName(name) {
    return axios.get(`/mausac/find?name=${name}`);
  },
  updateMauSac(id, data) {
    return axios.put(`mausac/${id}`, data);
  },
  deleteMauSac(id) {
    return axios.delete(`mausac/${id}`);
  },
};

export default mausacService;
