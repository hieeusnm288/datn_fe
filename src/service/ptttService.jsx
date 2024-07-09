import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const ptttService = {
  getListPTTT() {
    return axiosLogin.get("/pttt/all");
  },
  addPTTT(data) {
    return axios.post("/pttt/add", data);
  },
  getDetailPTTT(id) {
    return axios.get(`pttt/${id}`);
  },
  updatePTTT(id, data) {
    return axios.put(`pttt/${id}`, data);
  },
  deletePTTT(id) {
    return axios.delete(`pttt/${id}`);
  },
};

export default ptttService;
