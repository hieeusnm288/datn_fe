import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, notification, Select, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getListCTSanPham,
  updateChiTietSanPham,
} from "../../redux/slice/chitietsanphamSlice";
const { Option } = Select;
function ModalEditCTSP({ visible, onCancel, data }) {
  const [listCTSanPham, setListCTSanPham] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(getListCTSanPham(data.idSanPham)).then((res) => {
        setListCTSanPham(res.payload.result);
      });
    }
  }, [data, dispatch]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (listCTSanPham) {
      listCTSanPham?.map((i, index) =>
        form.setFieldsValue({
          [`soluong-${index}`]: i?.soluongton,
          [`dongia-${index}`]: i?.dongia,
          [`trangthai-${index}`]: Number(i?.trangthai),
        })
      );
    }
  }, [listCTSanPham]);

  const validateNumber = (rule, value) => {
    if (!value) {
      return Promise.resolve();
    }
    if (isNaN(value)) {
      return Promise.reject("Giá trị phải là một số");
    }
    if (value < 0) {
      return Promise.reject("Số lượng không thể nhỏ hơn 0");
    }
    return Promise.resolve();
  };
  const onFinish = (values) => {
    console.log(values);
    form.validateFields().then((values) => {
      listCTSanPham?.map((i, index) =>
        dispatch(
          updateChiTietSanPham({
            soluongton: values[`soluong-${index}`],
            dongia: values[`dongia-${index}`],
            trangthai: values[`trangthai-${index}`],
            id: i?.idChiTietSanPham,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            onCancel();
          }
        })
      );
    });
  };
  return (
    <>
      <Modal
        title="Update Chi Tiết Sản phẩm"
        open={visible}
        onCancel={onCancel}
        id="tableProduct"
        footer={null}
        width={1200}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          layout="vertical"
        >
          {listCTSanPham?.map((i, index) => (
            <>
              <div className="d-flex mb-1">
                <b className="fs-6" style={{ width: "33%" }}>
                  Tên Sản phẩm: {data?.tensanpham}
                </b>
                <b className="fs-6" style={{ width: "33%" }}>
                  Màu Sắc: {i.mausac.tenmausac}
                </b>
                <b className="fs-6" style={{ width: "33%" }}>
                  Kích Cỡ: {i.kichco.tenkichco}
                </b>
              </div>

              <div className="d-flex justify-content-between">
                <Form.Item
                  name={`dongia-${index}`}
                  label="Đơn Giá"
                  rules={[
                    {
                      required: true,
                      message: "Đơn giá là bắt buộc.",
                    },
                    {
                      type: "number",
                      message: "Đơn giá phải là một số.",
                      transform(value) {
                        return Number(value);
                      },
                    },
                    {
                      type: "number",
                      min: 1,
                      message: "Đơn giá lớn hơn 1",
                      transform(value) {
                        return Number(value);
                      },
                    },
                  ]}
                  style={{ width: "33%" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={`soluong-${index}`}
                  label="Số lượng"
                  rules={[
                    {
                      required: true,
                      message: "Số lượng là bắt buộc.",
                    },
                    {
                      type: "number",
                      message: "Số lượng phải là một số.",
                      transform(value) {
                        return Number(value);
                      },
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Số lượng không thể âm",
                      transform(value) {
                        return Number(value);
                      },
                    },
                  ]}
                  style={{ width: "33%" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={`trangthai-${index}`}
                  label="Trạng Thái"
                  rules={[
                    {
                      required: true,
                      message: "Không bỏ trống",
                    },
                  ]}
                  style={{ width: "33%" }}
                >
                  <Select placeholder="Chọn Trạng Thái">
                    <Option value={1}>Visible</Option>
                    <Option value={0}>Invisible</Option>
                  </Select>
                </Form.Item>
              </div>
            </>
          ))}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalEditCTSP;
