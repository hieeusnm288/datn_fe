import React, { useEffect, useState } from "react";
import "./CartProduct.scss";
import { DeleteOutlined } from "@ant-design/icons";
import { getListHinhAnh } from "../../redux/slice/hinhAnhSlice";
import { useSelector, useDispatch } from "react-redux";
function ProductOrder({ product }) {
  const dispatch = useDispatch();
  const [hinhAnh, setHinhAnh] = useState();
  useEffect(() => {
    if (product) {
      dispatch(getListHinhAnh(product?.chiTietSanPham?.idChiTietSanPham)).then(
        (res) => {
          setHinhAnh(res?.payload?.result);
        }
      );
    }
  }, [product, dispatch]);
  console.log(product);
  return (
    <div className="cart-product">
      <div className="card m-2">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="img-product col-2">
              <img
                src={
                  hinhAnh
                    ? `http://localhost:8080/api/v1/thuonghieu/logo/${hinhAnh[0]?.tenhinhanh}`
                    : ""
                }
              />
            </div>
            <div className="name-product col-2">
              <div className="d-flex flex-column">
                <div>Tên sản phẩm</div>
                <div> {product?.chiTietSanPham?.sanpham?.tensanpham}</div>
              </div>
            </div>
            <div className="name-product col-1">
              <div className="d-flex flex-column">
                <div>Kích Cỡ</div>
                <div className="count-product">
                  {product?.chiTietSanPham?.kichco?.tenkichco}
                </div>
              </div>
            </div>
            <div className="name-product col-2">
              <div className="d-flex flex-column">
                <div>Màu Sắc</div>
                <div className="count-product">
                  {product?.chiTietSanPham?.mausac?.tenmausac}
                </div>
              </div>
            </div>
            <div className="name-product col-2">
              <div className="d-flex flex-column">
                <div>Số Lượng</div>
                <div className="count-product">{product?.soluong}</div>
              </div>
            </div>

            <div className="price-product col-2">
              <div className="d-flex flex-column">
                <div>Giá</div>
                <div className="count-product">
                  {product?.chiTietSanPham.dongia.toLocaleString("vi-VN")} VND
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductOrder;
