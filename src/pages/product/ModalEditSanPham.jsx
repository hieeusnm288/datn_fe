import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, notification, Select, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { updateSanPham } from "../../redux/slice/sanphamSlice";
import { getListBrand } from "../../redux/slice/brandSlice";
import ModalEditCTSP from "./ModalEditCTSP";

function ModalEditSanPham({ visible, onCancel, data }) {
  const { listBrand, totalElements } = useSelector((state) => state.brand);
  const [sanPhamDeatil, setSanPhamDetail] = useState();
  const [showModalUpdateDetail, setShowModalUpdateDetail] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const openModalUpdate = (record) => {
    setSanPhamDetail(data);
    setShowModalUpdateDetail(true);
  };
  const cancelModalUpdate = () => {
    setSanPhamDetail(null);
    setShowModalUpdateDetail(false);
  };

  const onFinish = (values) => {
    form.validateFields().then((values) => {
      dispatch(
        updateSanPham({
          idSanPham: data.idSanPham,
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
          onCancel();
        }
      });
    });
  };
  useEffect(() => {
    dispatch(getListBrand());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        tensanpham: data?.tensanpham.trimEnd(),
        idThuongHieu: data?.thuonghieu.idThuongHieu,
        mota: data.mota.trimEnd(),
        trangthai: Number(data.trangthai),
      });
    }
  }, [data, form]);
  return (
    <>
      <Modal
        title="Update Sản phẩm"
        open={visible}
        onCancel={onCancel}
        id="tableProduct"
        footer={null}
        width={980}
      >
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
                  <Option value={i?.idThuongHieu}>{i?.tenthuonghieu}</Option>
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
        <Button
          style={{ float: "right", marginTop: "-30px", cursor: "pointer" }}
          onClick={openModalUpdate}
        >
          Update Chi Tiết Sản Phẩm
        </Button>
      </Modal>

      <ModalEditCTSP
        visible={showModalUpdateDetail}
        onCancel={cancelModalUpdate}
        data={sanPhamDeatil}
      />
    </>
  );
}

export default ModalEditSanPham;
