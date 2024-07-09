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
  getKhuyenMai,
  insertKhuyenMai,
  updateKhuyenMai,
} from "../../redux/slice/khuyenmaiSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
function AddKM() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const onFinish = (values) => {
    if (id) {
      form.validateFields().then((values) => {
        dispatch(
          updateKhuyenMai({
            id: id,
            makhuyenmai: values.makhuyenmai,
            phamtramgiam: values.phamtramgiam,
            ngaybatdau: values.ngaybatdau,
            ngayketthuc: values.ngayketthuc,
            trangthai: values.trangthai,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-khuyenmai");
          }
        });
      });
    } else {
      form.validateFields().then((values) => {
        dispatch(
          insertKhuyenMai({
            makhuyenmai: values.makhuyenmai,
            phamtramgiam: values.phamtramgiam,
            ngaybatdau: values.ngaybatdau,
            ngayketthuc: values.ngayketthuc,
            trangthai: values.trangthai,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-khuyenmai");
          }
        });
      });
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(getKhuyenMai(id)).then((res) => {
        if (id) {
          console.log(res);
          const date = new Date(res?.payload?.result.ngaybatdau);
          const date2 = new Date(res?.payload?.result.ngayketthuc);
          form.setFieldsValue({
            makhuyenmai: res?.payload?.result.makhuyenmai,
            phamtramgiam: res?.payload?.result.phamtramgiam,
            ngaybatdau: moment(date),
            ngayketthuc: moment(date2),
            gioitinh: res?.payload?.result.gioitinh,
            trangthai: res?.payload?.result.trangthai,
          });
        }
      });
    } else {
      form.setFieldsValue({
        makhuyenmai: "",
        phamtramgiam: "",
        ngaybatdau: "",
        ngayketthuc: "",
        gioitinh: 0,
        trangthai: 0,
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
          <h5 className="card-title fw-semibold mb-4">Thêm mới Khuyễn Mãi</h5>
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
                  name="makhuyenmai"
                  label="Mã Khuyễn Mãi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <div className="d-flex justify-content-between">
                  <div style={{ width: "49%" }}>
                    <Form.Item
                      name="ngaybatdau"
                      label="Ngày Bắt Đầu"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </div>
                  <div style={{ width: "49%" }}>
                    <Form.Item
                      name="ngayketthuc"
                      label="Ngày Két Thúc"
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
                  <div style={{ width: "49%" }}>
                    <Form.Item
                      name="phamtramgiam"
                      label="Phần trăm giảm (%)"
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

export default AddKM;
