import React, { useEffect, useState } from "react";
import { Select, Space, Button, Form, Input, notification, Upload } from "antd";
import { getListMauSac } from "../../redux/slice/mausacSlice";
import { getListKichCo } from "../../redux/slice/kichcoSlice";
import { getListDeGiay } from "../../redux/slice/degiaySlice";
import { getSanPham } from "../../redux/slice/sanphamSlice";
import { insertCTSanPham } from "../../redux/slice/chitietsanphamSlice";
import { inserHinhAnh } from "../../redux/slice/hinhAnhSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
function AddDetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { listMauSac } = useSelector((state) => state.mausac);
  const { listKichCo } = useSelector((state) => state.kichco);
  const { listDeGiay } = useSelector((state) => state.degiay);
  const [sanPham, setSanPham] = useState();
  const [mauSac, setMauSac] = useState();
  const [deGiay, setDeGiay] = useState();
  const [size, setSize] = useState();
  const [count, setCount] = useState(0);
  useEffect(() => {
    dispatch(getListMauSac());
    dispatch(getListKichCo());
    dispatch(getListDeGiay());
  }, [dispatch]);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(getSanPham(id)).then((res) => {
        setSanPham(res?.payload?.result);
      });
    }
  }, [id, dispatch]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[1]];
    }
    return e && e.fileList;
  };

  const handleChangeMS = (value, index) => {
    setMauSac(index);
  };
  const handleChangeSize = (value, index) => {
    setSize(index);
  };
  const handleChangeDG = (value) => {
    setDeGiay(value);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    form.validateFields().then((values) => {
      mauSac?.map((i, colorIndex) =>
        size.map((k, sizeIndex) =>
          dispatch(
            insertCTSanPham({
              idKichCo: k?.value,
              idMauSac: i?.value,
              idSanPham: id,
              soluongton: values[`soluong-${colorIndex}-${sizeIndex}`],
              dongia: values[`dongia-${colorIndex}-${sizeIndex}`],
              trangthai: values[`trangthai-${colorIndex}-${sizeIndex}`],
              idDeGiay: deGiay,
            })
          ).then((res) => {
            if (res.payload) {
              dispatch(
                inserHinhAnh({
                  idChiTietSanPham: res.payload.result.idChiTietSanPham,
                  trangthai: 1,
                  logoFile: values[`logoFile-${colorIndex}-${sizeIndex}`],
                })
              ).then((respone) => {
                if (res.payload) {
                  notification.open({
                    message: "Thành công!",
                    description: "Dữ liệu đã được cập nhật",
                    type: "success",
                  });

                  navigate(`/admin/list-products`);
                }
              });
            }
          })
        )
      );
    });
  };

  return (
    <>
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
            <h5 className="card-title fw-semibold mb-4">
              Thêm Chi Tiết Sản Phẩm
            </h5>
            <div
              className="card"
              style={{
                border: "none",
                boxShadow:
                  "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              }}
            >
              <div className="card-body">
                <label className="mb-1">Chọn đế giày</label>
                <Select
                  placeholder="Chọn Đế Giày"
                  style={{ width: "100%" }}
                  onChange={handleChangeDG}
                >
                  {listDeGiay?.map((i) => (
                    <Option value={i?.idDeGiay}>{i?.tendegiay}</Option>
                  ))}
                </Select>
                <label className="mb-1">Chọn Màu Sắc</label>
                <Select
                  placeholder="Chọn Màu Sắc"
                  style={{ width: "100%" }}
                  onChange={handleChangeMS}
                  mode="multiple"
                >
                  {listMauSac?.map((i) => (
                    <Option value={i?.idMauSac}>{i?.tenmausac}</Option>
                  ))}
                </Select>
                <label className="mb-1">Chọn đế Size</label>
                <Select
                  placeholder="Chọn Size"
                  style={{ width: "100%" }}
                  onChange={handleChangeSize}
                  mode="multiple"
                >
                  {listKichCo?.map((i) => (
                    <Option value={i?.idKichCo}>{i?.tenkichco}</Option>
                  ))}
                </Select>

                <p className="mt-3">Danh Sách Thuộc Tính</p>
                <Form
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                  layout="vertical"
                >
                  {mauSac?.map((i, colorIndex) => (
                    <div>
                      {size?.map((k, sizeIndex) => (
                        <>
                          <div className="d-flex mb-1">
                            <b className="fs-6" style={{ width: "33%" }}>
                              Tên Sản phẩm: {sanPham?.tensanpham}
                            </b>
                            <b className="fs-6" style={{ width: "33%" }}>
                              Màu Sắc: {i.children}
                            </b>
                            <b className="fs-6" style={{ width: "33%" }}>
                              Kích Cỡ: {k.children}
                            </b>
                          </div>

                          <div className="d-flex justify-content-between">
                            <Form.Item
                              name={`dongia-${colorIndex}-${sizeIndex}`}
                              label="Đơn Giá"
                              rules={[
                                {
                                  required: true,
                                  message: "Không được bỏ trống",
                                },
                              ]}
                              style={{ width: "33%" }}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name={`soluong-${colorIndex}-${sizeIndex}`}
                              label="Số lượng"
                              rules={[
                                {
                                  required: true,
                                  message: "Không bỏ trống",
                                },
                              ]}
                              style={{ width: "33%" }}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name={`trangthai-${colorIndex}-${sizeIndex}`}
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
                          <Form.Item
                            label="Hình Ảnh"
                            name={`logoFile-${colorIndex}-${sizeIndex}`}
                            rules={[
                              {
                                required: true,
                                message: "Không bỏ trống",
                              },
                            ]}
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                          >
                            <Upload
                              // action="/upload.do"
                              listType="picture-card"
                              accept=".jpg,.png,.gif"
                              maxCount={1}
                              beforeUpload={() => false}
                            >
                              <button
                                style={{
                                  border: 0,
                                  background: "none",
                                }}
                                type="button"
                              >
                                <PlusOutlined />
                                <div
                                  style={{
                                    marginTop: 8,
                                  }}
                                >
                                  Upload
                                </div>
                              </button>
                            </Upload>
                          </Form.Item>
                        </>
                      ))}
                    </div>
                  ))}
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
    </>
  );
}

export default AddDetailProduct;
