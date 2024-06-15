import axios from "./customaxios";
import axiosLogin from "./loginaxios";
const productService = {
  insertProduct(product) {
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("status", product.status);
    formData.append("specifications", product.specifications);
    formData.append("description", product.description);
    formData.append("category_id", product.category_id);
    formData.append("brand_id", product.brand_id);
    if (product.productFile[0].originFileObj) {
      formData.append("productFile", product.productFile[0].originFileObj);
    }

    return axios.post("/product", formData);
  },
  getListProduct(param) {
    return axiosLogin.get(
      `/product/search?name=${param.name}&categoryId=${param.categoryId}&brandId=${param.brandId}&page=${param.page}&size=12`
    );
  },
  deleteProduct(id) {
    return axios.delete(`product/${id}`);
  },
  getDetailProduct(id) {
    return axios.get(`product/${id}`);
  },
  updateProduct(product) {
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("status", product.status);
    formData.append("specifications", product.specifications);
    formData.append("description", product.description);
    formData.append("category_id", product.category_id);
    formData.append("brand_id", product.brand_id);
    if (product.productFile[0].originFileObj) {
      formData.append("productFile", product.productFile[0].originFileObj);
    }
    return axios.put(`product/${product.id}`, formData);
  },
  getImageProduct(url) {
    return axios.get(`/product/image/${url}`);
  },
};

export default productService;
