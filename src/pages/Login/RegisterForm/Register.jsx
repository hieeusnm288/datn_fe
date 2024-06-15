import React from "react";
import { Button, Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./registerstyle.scss";
import { useNavigate } from "react-router-dom";
import { registerAccount } from "../../../redux/slice/accountSlice";

function Register() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    form.validateFields().then((values) => {
      dispatch(
        registerAccount({
          name: values.name,
          username: values.username,
          phone: values.phone,
          password: values.password,
          email: values.email,
        })
      ).then((res) => {
        if (res.payload) {
          notification.open({
            message: "Đăng ký thành công!",
            description: "Bạn đã đăng ký thành khoản thành công!",
            type: "success",
          });
          navigate("/login");
        }
      });
    });
  };
  const onFinishFailed = (errorInfo) => {};

  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/login");
  };
  return (
    <div className="register">
      <section className="container">
        <div className="login-box">
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            form={form}
          >
            <h2>Member Register</h2>
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input placeholder="Enter your Full Name" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Enter your Username" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input phone number",
                },
              ]}
            >
              <Input placeholder="Enter your phonr numbe" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
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
            <Form.Item
              label="Confrim Password"
              name="password2"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  validator: (_, value) => {
                    if (!value || value === form.getFieldValue("password")) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="login-now" onClick={onClickLogin}>
            Back to Login
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
