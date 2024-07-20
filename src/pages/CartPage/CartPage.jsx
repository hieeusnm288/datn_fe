import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import CartProduct from "../../components/cartproduct/CartProduct";
import {
  Button,
  Form,
  Input,
  notification,
  Radio,
  Space,
  Select,
  Modal,
} from "antd";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListGioCT, deleteAll } from "../../redux/slice/chitietgiohangSlice";
import { getListDiaChi, getDiaChi } from "../../redux/slice/diachiSlice";
import { getListPTTT } from "../../redux/slice/ptttSlice";
import { getlistKhuyenMai } from "../../redux/slice/khuyenmaiSlice";
import { getKhachHang } from "../../redux/slice/khachhangSlice";
import { insertDonHang } from "../../redux/slice/donHangSlice";
import { insertDonHangCT } from "../../redux/slice/donhangchitietSlice";

function CartPage() {
  const { listDiaChi } = useSelector((state) => state.diachi);
  const { listKhuyenMai, totalElements } = useSelector(
    (state) => state.khuyenmai
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trangThai, setTrangThai] = useState(1);
  const { listPTTT } = useSelector((state) => state.pttt);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState(false);
  const [valueKM, setValueKM] = useState();
  const [username, setUsername] = useState();
  const [khachHang, setKhachHang] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listGioHangCT } = useSelector((state) => state.giohangct);
  useEffect(() => {
    dispatch(getListGioCT(localStorage.getItem("idGioHang").slice(1, -1))).then(
      (res) => {
        if (res?.payload.result) {
          setCartItems(res?.payload.result);
        }
      }
    );
  }, [dispatch]);
  useEffect(() => {
    dispatch(getlistKhuyenMai(trangThai));
  }, [dispatch, trangThai]);
  const [form] = Form.useForm();
  // console.log(listGioHangCT);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      if (userData) {
        setUsername(userData.sub + "");
      }
    }
  }, []);
  useEffect(() => {
    dispatch(getListPTTT());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      dispatch(getListDiaChi(userData.id));
    }
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      dispatch(getKhachHang(userData.id)).then((res) => {
        if (res?.payload?.result) {
          setKhachHang(res?.payload?.result);
        }
      });
    }
  }, [dispatch]);
  const Onpayment = () => {
    if (!username) {
      notification.open({
        message: "Bạn chưa đăng nhập!",
        description: "Vui lòng đăng nhập để đặt hàng",
        type: "warning",
      });
      navigate("/login");
    } else {
      setPayment(!payment);
    }
  };

  // console.log(listGioHangCT);

  const [valueDC, setValueDC] = useState(1);
  const onChangeDC = (e) => {
    dispatch(getDiaChi(e.target.value)).then((res) => {
      if (res?.payload?.result) {
        setValueDC(
          `${res?.payload?.result?.chitiet?.trimEnd()} - ${res?.payload?.result?.phuongxa?.trimEnd()} - ${res?.payload?.result?.quanhuyen?.trimEnd()} - ${res?.payload?.result?.thanhpho?.trimEnd()}`
        );
      }
    });
  };
  console.log(valueDC);
  const [valuePTTT, setValuePTTT] = useState(1);
  const onChangePTTT = (e) => {
    setValuePTTT(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeKM = (ma) => {
    if (ma?.dieukien > Number(totalPrice)) {
      notification.open({
        message: "Thất bại!",
        description: "Không đủ điều kiện",
        type: "error",
      });
      setValueKM();
    } else {
      setValueKM(ma);
    }
  };
  useEffect(() => {
    let total = 0;
    listGioHangCT.forEach((item) => {
      total += item.tongtien * item.soluong;
    });
    setTotalPrice(total);
  }, [listGioHangCT]);

  console.log(listGioHangCT);

  const onFinish = (values) => {
    form.validateFields().then((values) => {
      dispatch(
        insertDonHang({
          idKhachHang: khachHang.idKhachHang,
          idKhuyenMai: valueKM ? valueKM?.idKhuyenMai : null,
          tongtien: valueKM
            ? totalPrice - (totalPrice * valueKM?.phamtramgiam) / 100
            : totalPrice,
          diachi: valueDC,
          idTrangThaiDonHang: 1,
          idPhuongThucThanhToan: valuePTTT,
        })
      ).then((res) => {
        if (res?.payload?.result) {
          listGioHangCT?.map((i) =>
            dispatch(
              insertDonHangCT({
                idHoaDon: res?.payload?.result.idHoaDon,
                idChiTietSanPham: i?.chiTietSanPham?.idChiTietSanPham,
                soluong: i?.soluong,
              })
            ).then((res) => {
              if (res?.payload?.result) {
                notification.open({
                  message: "Thành công!",
                  description: "Đặt hàng thành công",
                  type: "success",
                });
                navigate(`/my-order`);
                // dispatch(
                //   deleteAll(localStorage.getItem("idGioHang").slice(1, -1))
                // );
              }
            })
          );
        }
      });
    });
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="cart-page container">
      <div className="row">
        <div className="col-12">
          <div
            className="card"
            style={{
              border: "none",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <div className="card-body">
              <div className="row justify-content-between">
                <div className="col-10">
                  <h5 className="card-title fw-semibold mb-4">Giỏ Hàng</h5>
                </div>
                {/* <div className="col-2">
                  <p className="clear">Clear Cart</p>
                </div> */}
              </div>
              <div>
                {listGioHangCT?.map((i) => (
                  <CartProduct product={i} />
                ))}
              </div>
              <div className="row justify-content-between mt-3">
                <div className="col-10">
                  <h5 className="card-title fw-semibold mb-4">Tổng Tiền</h5>
                </div>
                <div className="col-2">
                  <p className="fw-bold">
                    {totalPrice?.toLocaleString("vi-VN")} VND
                  </p>
                </div>
              </div>
              <div className="mt-3 float-end">
                <button
                  type="button"
                  className={!payment ? "btn btn-primary" : "btn btn-danger"}
                  onClick={Onpayment}
                  disabled={cartItems.length <= 0 ? true : false}
                >
                  {!payment ? "Đặt Hàng" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!payment || listGioHangCT.length === 0 ? (
        <></>
      ) : (
        <div className="form-pay mt-3">
          <div
            className="card"
            style={{
              border: "none",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <div className="card-body">
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                form={form}
              >
                <Form.Item
                  label="Tên Khách Hàng"
                  name="tenkhachhang"
                  rules={[
                    {
                      required: true,
                      message: "Không bỏ trống!",
                    },
                  ]}
                  initialValue={
                    khachHang ? khachHang.tenkhachhang.trimEnd() : ""
                  }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="sodienthoai"
                  rules={[
                    {
                      required: true,
                      message: "Không bỏ trống!",
                    },
                  ]}
                  initialValue={
                    khachHang ? khachHang.sodienthoai.trimEnd() : ""
                  }
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Không bỏ trống!",
                    },
                  ]}
                  initialValue={khachHang ? khachHang.email.trimEnd() : ""}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Chọn Địa Chỉ"
                  name="diachi"
                  rules={[
                    {
                      required: true,
                      message: "Không bỏ trống!",
                    },
                  ]}
                >
                  <Radio.Group onChange={onChangeDC} value={valueDC}>
                    <Space direction="vertical">
                      {listDiaChi?.map((i) => (
                        <Radio value={i?.idDiaChi}>
                          {i?.chitiet} - {i?.phuongxa} - {i?.quanhuyen} -{" "}
                          {i?.thanhpho}
                        </Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Chọn Phương Thức Thanh Toán"
                  name="idPhuongThucThanhToan"
                  rules={[
                    {
                      required: true,
                      message: "Không bỏ trống!",
                    },
                  ]}
                >
                  <Radio.Group onChange={onChangePTTT} value={valuePTTT}>
                    {listPTTT?.map((i) => (
                      <Radio value={i?.id}>{i?.hinhthuc}</Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
                <div className="d-flex justify-content-between">
                  <p>Áp Dụng Mã Giảm Giá</p>
                  <Button onClick={showModal}>Chọn Mã Giảm Giá</Button>
                </div>
                <div>
                  {valueKM ? (
                    <p>
                      Mã: {valueKM?.makhuyenmai} - Phần trăn giảm:{" "}
                      {valueKM?.phantramgiam} - Điều kiên{" "}
                      {valueKM?.dieukien?.toLocaleString("vi-VN")}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="d-flex justify-content-between mt-5">
                  <div>
                    <h5 className="card-title fw-semibold mb-4">
                      Tổng Tiền Đơn Hàng
                    </h5>
                  </div>
                  <div>
                    <p className="fw-bold" style={{ fontSize: "18px" }}>
                      {totalPrice?.toLocaleString("vi-VN")} VND
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="card-title fw-semibold mb-4">
                      Khuyễn Mại(%)
                    </h5>
                  </div>
                  <div>
                    <p className="fw-bold" style={{ fontSize: "18px" }}>
                      {valueKM ? `${valueKM?.phamtramgiam}%` : "0"}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="card-title fw-semibold mb-4">
                      Tổng Tiền Đơn Hàng
                    </h5>
                  </div>
                  <div>
                    <p className="fw-bold" style={{ fontSize: "18px" }}>
                      {valueKM
                        ? (
                            totalPrice -
                            (totalPrice * valueKM?.phamtramgiam) / 100
                          ).toLocaleString("vi-VN")
                        : totalPrice.toLocaleString("vi-VN")}{" "}
                      VND
                    </p>
                  </div>
                </div>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Đặt Hàng
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}
      <Modal
        title="Mã Giảm Giá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {listKhuyenMai?.map((i) => (
          <div className="d-flex justify-content-between">
            <p>
              Mã: {i?.makhuyenmai} - Phần trăn giảm: {i?.phantramgiam} - Điều
              kiên {i?.dieukien?.toLocaleString("vi-VN")}
            </p>
            <Button onClick={() => handleChangeKM(i)}>Áp dụng</Button>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default CartPage;
