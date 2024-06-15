import axios from "./customaxios";
import axiosLogin from "./loginaxios";

const accountService = {
  registerAccount(acc) {
    return axiosLogin.post("/account", acc);
  },

  getListAccount(param) {
    return axios.get(
      `/account/search?name=${param.name}&page=${param.page}0&size=10`
    );
  },
  deleteAccount(id) {
    return axios.delete(`account/${id}`);
  },
  detailAccount(id) {
    return axios.get(`account/${id}`);
  },
  updateAccount(acc) {
    return axios.get(`account/${acc.id}`, acc);
  },
  loginAccount(acc) {
    return axiosLogin.post("account/login", acc);
  },
};

export default accountService;
