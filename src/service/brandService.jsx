import axios from "./customaxios";
import axiosLogin from "./loginaxios";
const brandService = {
  getListBrand(key) {
    return axiosLogin.get(`/thuonghieu/all`);
  },
  deleteBrand(id) {
    return axios.delete(`/thuonghieu/${id}`);
  },
  getDetailBrand(id) {
    return axios.get(`/thuonghieu/${id}`);
  },
  getLogoBrand(logo) {
    return axios.get(`/thuonghieu/${logo}`);
  },
  updateBrand(brand) {
    let formData = new FormData();
    formData.append("tenthuonghieu", brand.tenthuonghieu);
    formData.append("mota", brand.mota);
    formData.append("trangthai", brand.trangthai);
    if (brand.logoFile[0].originFileObj) {
      formData.append("logoFile", brand.logoFile[0].originFileObj);
    }

    return axios.put(`/thuonghieu/${brand.idThuongHieu}`, formData);
  },
  insertBrand(brand) {
    let formData = new FormData();
    formData.append("tenthuonghieu", brand.tenthuonghieu);
    formData.append("mota", brand.mota);
    formData.append("trangthai", brand.trangthai);
    if (brand.logoFile[0].originFileObj) {
      formData.append("logoFile", brand.logoFile[0].originFileObj);
    }
    return axios.post("/thuonghieu/add", formData);
  },
  getImageBrand(url) {
    return axios.get(`/brand/logo/${url}`);
  },
};

export default brandService;
