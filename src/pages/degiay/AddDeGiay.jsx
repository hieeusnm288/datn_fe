import React, { useState, useEffect } from "react";
import { Button, Form, Input, Space, notification, Select } from "antd";
import {
  getDeGiay,
  insertDeGiay,
  updateDeGiay,
} from "../../redux/slice/degiaySlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function AddDeGiay() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const onFinish = (values) => {
    if (id) {
      form.validateFields().then((values) => {
        dispatch(
          updateDeGiay({
            id: id,
            tendegiay: values.tendegiay,
            trangthai: values.trangthai,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-degiay");
          }
        });
      });
    } else {
      form.validateFields().then((values) => {
        dispatch(
          insertDeGiay({
            tendegiay: values.tendegiay,
            trangthai: values.trangthai,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-degiay");
          }
        });
      });
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(getDeGiay(id)).then((res) => {
        if (id) {
          form.setFieldsValue({
            tendegiay: res?.payload?.result.tendegiay.trimEnd(),
            trangthai: res?.payload?.result.trangthai,
          });
        }
      });
    } else {
      form.setFieldsValue({
        tendegiay: "",
        trangthai: "",
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
          <h5 className="card-title fw-semibold mb-4">Thêm mới Đế Giày</h5>
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
                  name="tendegiay"
                  label="Tên Đế Giày"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
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

export default AddDeGiay;
