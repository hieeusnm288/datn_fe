import axios from "./customaxios";
import axiosLogin from "./loginaxios";
const brandService = {
  getListBrand(key) {
    return axiosLogin.get(
      `/brand/find?query=${key.query}&size=10&sort=id&page=${key.page}`
    );
  },
  deleteBrand(id) {
    return axios.delete(`/brand/${id}`);
  },
  getDetailBrand(id) {
    return axios.get(`/brand/${id}`);
  },
  getLogoBrand(logo) {
    return axios.get(`/brand/${logo}`);
  },
  updateBrand(brand) {
    let formData = new FormData();
    formData.append("name", brand.name);
    if (brand.logoFile[0].originFileObj) {
      formData.append("logoFile", brand.logoFile[0].originFileObj);
    }

    return axios.put(`/brand/${brand.id}`, formData);
  },
  insertBrand(brand) {
    let formData = new FormData();
    formData.append("name", brand.name);
    if (brand.logoFile[0].originFileObj) {
      formData.append("logoFile", brand.logoFile[0].originFileObj);
    }
    return axios.post("/brand", formData);
  },
  getImageBrand(url) {
    return axios.get(`/brand/logo/${url}`);
  },
};

export default brandService;
