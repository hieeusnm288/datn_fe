import React, { useEffect, useState } from "react";
import "./CartProduct.scss";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { getListHinhAnh } from "../../redux/slice/hinhAnhSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteGioHangCT,
  getListGioCT,
  updateGioHangCT,
} from "../../redux/slice/chitietgiohangSlice";
import { notification } from "antd";
function CartProduct({ product }) {
  const dispatch = useDispatch();
  const [hinhAnh, setHinhAnh] = useState();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (product) {
      dispatch(getListHinhAnh(product?.chiTietSanPham?.idChiTietSanPham)).then(
        (res) => {
          setHinhAnh(res?.payload?.result);
        }
      );
    }
  }, [product, dispatch]);

  const downQuantity = () => {
    dispatch(
      updateGioHangCT({
        id: product?.idGioHangChiTiet,
        idGioHang: product.gioHang.idGioHang,
        idChiTietSanPham: product.chiTietSanPham.idChiTietSanPham,
        soluong: product.soluong - 1,
      })
    ).then((res) => {
      if (res.payload?.result) {
        dispatch(
          getListGioCT(localStorage.getItem("idGioHang").slice(1, -1))
        ).then((res) => {
          if (res?.payload.result) {
            notification.open({
              message: "Thành công!",
              description: "Giảm Thành Công",
              type: "success",
            });
          }
        });
      } else {
        notification.open({
          message: "Thất bại!",
          description: "Số lượng không thể là 0",
          type: "error",
        });
      }
    });
  };

  const upQuantity = () => {
    dispatch(
      updateGioHangCT({
        id: product?.idGioHangChiTiet,
        idGioHang: product.gioHang.idGioHang,
        idChiTietSanPham: product.chiTietSanPham.idChiTietSanPham,
        soluong: product.soluong + 1,
      })
    ).then((res) => {
      if (res.payload?.result) {
        dispatch(
          getListGioCT(localStorage.getItem("idGioHang").slice(1, -1))
        ).then((res) => {
          if (res?.payload.result) {
            notification.open({
              message: "Thành công!",
              description: "Thêm sản phẩm",
              type: "success",
            });
          }
        });
      } else {
        notification.open({
          message: "Thất bại!",
          description: "Vượt quá số lượng sản phẩm hoắc số lượng vượt quá 10",
          type: "error",
        });
      }
    });
  };

  const deleteProct = (product) => {
    dispatch(deleteGioHangCT(product.idGioHangChiTiet)).then((res) => {
      if (res?.payload?.result) {
        dispatch(
          getListGioCT(localStorage.getItem("idGioHang").slice(1, -1))
        ).then((res) => {
          if (res?.payload.result) {
            notification.open({
              message: "Thành công!",
              description: "Xóa sản phẩm khỏi giỏ hàng",
              type: "success",
            });
          }
        });
      }
    });
  };

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
                <div className="d-flex">
                  <button className="btn-quantity" onClick={downQuantity}>
                    <MinusOutlined />
                  </button>
                  <div className="quantity">{product?.soluong}</div>
                  <button className="btn-quantity" onClick={upQuantity}>
                    <PlusOutlined />
                  </button>
                </div>
              </div>
            </div>

            <div className="price-product col-2">
              <div className="d-flex flex-column">
                <div>Giá</div>
                <div className="count-product">
                  {product?.tongtien.toLocaleString("vi-VN")} VND
                </div>
              </div>
            </div>
            <div className="delete-product col-1">
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => deleteProct(product)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
