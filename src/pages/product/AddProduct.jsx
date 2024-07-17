import React, { useState, useEffect } from "react";
import { Button, Form, Input, Space, notification, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { insertSanPham } from "../../redux/slice/sanphamSlice";
import { getListBrand } from "../../redux/slice/brandSlice";

import { useNavigate, useParams } from "react-router-dom";
function AddProduct() {
  const { listBrand, totalElements } = useSelector((state) => state.brand);
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    form.validateFields().then((values) => {
      dispatch(
        insertSanPham({
          tensanpham: values.tensanpham,
          idThuongHieu: values.idThuongHieu,
          mota: values.mota,
          trangthai: values.trangthai,
        })
      ).then((res) => {
        if (res.payload) {
          notification.open({
            message: "Thành công!",
            description: "Dữ liệu đã được cập nhật",
            type: "success",
          });

          navigate(
            `/admin/product/add-detail/${res?.payload?.result.idSanPham}`
          );
        }
      });
    });
  };

  useEffect(() => {
    dispatch(getListBrand());
  }, [dispatch]);
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
          <h5 className="card-title fw-semibold mb-4">Thêm mới Sản Phẩm</h5>
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
                <div className="d-flex justify-content-between">
                  <Form.Item
                    name="tensanpham"
                    label="Tên Sản Phẩm"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    style={{ width: "49%" }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="idThuongHieu"
                    label="Thương Hiệu"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    style={{ width: "49%" }}
                  >
                    <Select placeholder="Chọn Thương Hiệu">
                      {listBrand?.map((i) => (
                        <Option value={i?.idThuongHieu}>
                          {i?.tenthuonghieu}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="d-flex justify-content-between">
                  <div style={{ width: "49%" }}>
                    <Form.Item
                      name="mota"
                      label="Mô tả"
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

export default AddProduct;
