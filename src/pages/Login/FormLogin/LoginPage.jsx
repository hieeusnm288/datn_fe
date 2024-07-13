import React from "react";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "./loginstyle.scss";
import { useDispatch } from "react-redux";
import { loginNhanVien } from "../../../redux/slice/nhanvienSlice";
function LoginPage() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(loginNhanVien(values)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Đăng nhập thành công!",
          description: "Bạn đã đăng nhập thành công!",
          type: "success",
        });
        localStorage.setItem("token", JSON.stringify(res.payload.jwt));
        navigate("/admin/dashboard");
        window.location.reload();
      } else {
        notification.open({
          message: "Đăng nhập thất bại!",
          description: "Vui lòng kiểm tra lại tài khoản và mật khẩu của bạn!",
          type: "error",
        });
      }
    });
  };
  const onFinishFailed = (errorInfo) => {};
  const navigate = useNavigate();

  const onClickRegister = () => {
    navigate("/register");
  };
  return (
    <div className="login">
      <section className="container">
        <div className="login-box">
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <h2>Member Login</h2>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="register-now" onClick={onClickRegister}>
            Register Now
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
