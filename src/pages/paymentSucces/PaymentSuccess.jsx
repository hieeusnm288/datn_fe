import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, notification, Result } from "antd";
import { insertDonHang } from "../../redux/slice/donHangSlice";
import { insertDonHangCT } from "../../redux/slice/donhangchitietSlice";
import { deleteAll, getListGioCT } from "../../redux/slice/chitietgiohangSlice";
import { useDispatch, useSelector } from "react-redux";
function PaymentSuccess() {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const { listGioHangCT } = useSelector((state) => state.giohangct);
  const vnp_ResponseCode = query.get("vnp_ResponseCode");
  const navigate = useNavigate();
  const hasCheckedRef = useRef(false);
  useEffect(() => {
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true;
      if (vnp_ResponseCode === "00") {
        xacnhan();
      } else {
        // Thanh toán thất bại
        alert("Payment failed!");
      }
    }
  }, [vnp_ResponseCode]);

  const xacnhan = () => {
    const vnp_TotalPay = query.get("vnp_Amount");
    dispatch(
      insertDonHang({
        idKhachHang: localStorage.getItem("idKhangHang").slice(1, -1),
        idKhuyenMai: localStorage.getItem("khuyenmai")
          ? localStorage.getItem("khuyenmai").slice(1, -1)
          : null,
        tongtien: vnp_TotalPay / 100,
        diachi: localStorage.getItem("diachi").slice(1, -1),
        idTrangThaiDonHang: 1,
        idPhuongThucThanhToan: 3,
      })
    ).then((res) => {
      if (res?.payload?.result) {
        JSON.parse(localStorage.getItem("listgiohang"))?.map((i) =>
          dispatch(
            insertDonHangCT({
              idHoaDon: res?.payload?.result.idHoaDon,
              idChiTietSanPham: i?.chiTietSanPham?.idChiTietSanPham,
              soluong: i?.soluong,
            })
          ).then((res) => {
            if (res?.payload?.result) {
              dispatch(
                deleteAll(localStorage.getItem("idGioHang").slice(1, -1))
              ).then((res) => {
                if (res?.payload?.result) {
                  dispatch(
                    getListGioCT(localStorage.getItem("idGioHang").slice(1, -1))
                  ).then((res) => {
                    if (res?.payload?.result) {
                      // setCartItems(res?.payload?.result);
                    }
                  });
                  notification.open({
                    message: "Thành công!",
                    description: "Đặt hàng thành công",
                    type: "success",
                  });
                  localStorage.removeItem("khuyenmai");
                  localStorage.removeItem("diachi");
                }
              });
            }
          })
        );
      }
    });
  };

  return (
    <>
      <Result
        status="success"
        title="Thanh Toán Thành Công"
        subTitle="Đơn hàng đã được thanh toán thành công"
        extra={[
          <Button key="buy" onClick={() => navigate("/my-order")}>
            Xác nhận
          </Button>,
        ]}
      />
    </>
  );
}

export default PaymentSuccess;
