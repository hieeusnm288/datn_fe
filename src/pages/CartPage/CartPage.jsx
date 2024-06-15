import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import CartProduct from "../../components/cartproduct/CartProduct";
import { Button, Form, Input, notification } from "antd";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { insertOrder } from "../../redux/slice/orderSlice";
import { useDispatch } from "react-redux";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState(false);
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, [cartItems]);
  const [form] = Form.useForm();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      if (userData) {
        setUsername(userData.sub + "");
      }
    }
  }, []);

  const dispatch = useDispatch();

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

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cartItems]);
  const onFinish = (values) => {
    form.validateFields().then((values) => {
      dispatch(
        insertOrder({
          username: username,
          address: values.address,
          list: cartItems,
        })
      ).then((res) => {
        if (res.payload) {
          notification.open({
            message: "Thành công!",
            description: "Đơn hàng đã được đặt",
            type: "success",
          });
          navigate("/my-order");
          localStorage.removeItem("cartItems");
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
                  <h5 className="card-title fw-semibold mb-4">Cart</h5>
                </div>
                <div className="col-2">
                  <p className="clear">Clear Cart</p>
                </div>
              </div>
              <div>
                {cartItems?.map((i) => (
                  <CartProduct product={i} />
                ))}
              </div>
              <div className="row justify-content-between mt-3">
                <div className="col-10">
                  <h5 className="card-title fw-semibold mb-4">Total payment</h5>
                </div>
                <div className="col-2">
                  <p className="fw-bold">
                    {totalPrice.toLocaleString("vi-VN")} VND
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
                  {!payment ? "Checkout" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!payment ? (
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
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                  initialValue={username ? username : ""}
                >
                  <Input disabled />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Purchase
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
