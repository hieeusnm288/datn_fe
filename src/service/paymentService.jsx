import axios from "./customaxios";
// import orderAxios from "./orderAxiois";
import axiosLogin from "./loginaxios";
const paymentService = {
  createPayment(amout) {
    return axiosLogin.post(`/payment/create`, amout);
  },
};

export default paymentService;
