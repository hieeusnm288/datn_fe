import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./registerstyle.scss";
import { useNavigate } from "react-router-dom";
import { insertKhachHang } from "../../../redux/slice/khachhangSlice";
const { Option } = Select;
function Register() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    form.validateFields().then((values) => {
      dispatch(
        insertKhachHang({
          tenkhachhang: values.tenkhachhang,
          username: values.username,
          gioitinh: values.gioitinh,
          sodienthoai: values.sodienthoai,
          email: values.email,
          ngaysinh: values.ngaysinh,
          trangthai: 1,
          password: values.password,
        })
      ).then((res) => {
        if (res.payload) {
          notification.open({
            message: "Thành công!",
            description: "Dữ liệu đã được cập nhật",
            type: "success",
          });
          navigate("/login");
        }
      });
    });
  };

  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate("/login");
  };
  return (
    <div className="register">
      <section className="container">
        <div className="login-box">
          <h2 className="mb-3">Đăng ký tài khoản</h2>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            layout="vertical"
          >
            <div>
              <div>
                <Form.Item
                  name="tenkhachhang"
                  label="Tên Khách Hàng"
                  rules={[
                    {
                      required: true,
                      message: "Tên khách hàng không bỏ trống",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="ngaysinh"
                  label="Ngày Sinh"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </div>

            <div>
              <div>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Username không bỏ trống",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Password không bỏ trống",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </div>
            </div>
            <div>
              <div>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Email không thể trống",
                    },
                    {
                      type: "email",
                      message: "Email không hợp lệ",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="sodienthoai"
                  label="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại không bỏ trống",
                    },
                    {
                      pattern: new RegExp(/^[0-9]{10}$/),
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <Form.Item
                  name="gioitinh"
                  label="Giới tính"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Chọn Giới tính">
                    <Option value={1}>Nam</Option>
                    <Option value={0}>Nữ</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
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
