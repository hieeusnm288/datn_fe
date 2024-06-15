import axios from "./customaxios";
import axiosLogin from "./loginaxios";
const categoryService = {
  insertCategory(category) {
    return axios.post("/category", category);
  },
  getListCate(page) {
    return axiosLogin.get(`/category/page?size=10&sort=id&page=${page}`);
  },
  deleteCategory(id) {
    return axios.delete(`category/${id}`);
  },
  getCategory(id) {
    return axios.get(`category/${id}`);
  },
  updateCategory(data) {
    return axios.put(`category/${data.id}`, data);
  },
};

export default categoryService;
