import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  notification,
  Select,
  DatePicker,
} from "antd";

import {
  getNhanVien,
  insertNhanVien,
  updateNhanVien,
} from "../../redux/slice/nhanvienSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
function ThemNhanVien() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [nhanvienDetail, setNhanvienDetail] = useState();
  const { Option } = Select;
  const onFinish = (values) => {
    if (id) {
      form.validateFields().then((values) => {
        dispatch(
          updateNhanVien({
            id: id,
            chucvu: values.chucvu,
            tennhanvien: values.tennhanvien,
            username: values.username,
            //  password: values.password,
            gioitinh: values.gioitinh,
            sodienthoai: values.sodienthoai,
            email: values.email,
            diachi: values.diachi,
            ngaysinh: values.ngaysinh,
            trangthai: values.trangthai,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-nhanvien");
          }
        });
      });
    } else {
      form.validateFields().then((values) => {
        dispatch(
          insertNhanVien({
            chucvu: values.chucvu,
            tennhanvien: values.tennhanvien,
            username: values.username,
            password: values.password,
            gioitinh: values.gioitinh,
            sodienthoai: values.sodienthoai,
            email: values.email,
            diachi: values.diachi,
            ngaysinh: values.ngaysinh,
            trangthai: values.trangthai,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-nhanvien");
          }
        });
      });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getNhanVien(id)).then((res) => {
        if (id) {
          setNhanvienDetail(res?.payload?.result);
          const date = new Date(res?.payload?.result.ngaysinh);
          form.setFieldsValue({
            tennhanvien: res?.payload?.result.tennhanvien.trimEnd(),
            username: res?.payload?.result.username,
            password: res?.payload?.result.password,
            email: res?.payload?.result.email.trimEnd(),
            sodienthoai: res?.payload?.result.sodienthoai.trimEnd(),
            diachi: res?.payload?.result.diachi.trimEnd(),
            ngaysinh: moment(date),
            gioitinh: res?.payload?.result.gioitinh,
            trangthai: res?.payload?.result.trangthai,
            chucvu: res?.payload?.result.chucvu,
          });
        }
      });
    } else {
      form.setFieldsValue({
        tennhanvien: "",
        username: "",
        password: "",
        email: "",
        sodienthoai: "",
        diachi: "",
        ngaysinh: "",
        gioitinh: 0,
        trangthai: 0,
        chucvu: 1,
      });
    }
  }, [id, form, dispatch]);
  return (
    <div className="add-category">
      <div
        className="card"
        style={{
          border: "none",
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        }}
      >
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">Thêm Mới Nhân Viên</h5>
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
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="tennhanvien"
                  label="Tên Nhân Viên"
                  rules={[
                    {
                      required: true,
                      message: "Tên nhân viên không bỏ trống",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <div className="d-flex justify-content-between">
                  <div style={{ width: "49%" }}>
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
                  <div style={{ width: "49%" }}>
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
                      <Input.Password disabled={id ? true : false} />
                    </Form.Item>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div style={{ width: "49%" }}>
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
                  <div style={{ width: "49%" }}>
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
                  <div style={{ width: "49%" }}>
                    <Form.Item
                      name="diachi"
                      label="Địa Chỉ"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div style={{ width: "49%" }}>
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
                <div className="d-flex justify-content-between">
                  <div style={{ width: "32%" }}>
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
                  <div style={{ width: "32%" }}>
                    <Form.Item
                      name="chucvu"
                      label="Chức vụ"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Chọn Giới tính">
                        <Option value={1}>Nhân Viên</Option>
                        <Option value={2}>Quản Lý</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div style={{ width: "32%" }}>
                    <Form.Item
                      name="trangthai"
                      label="Trạng Thái"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Chọn Giới tính">
                        <Option value={1}>Visible</Option>
                        <Option value={0}>Invisible</Option>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemNhanVien;
