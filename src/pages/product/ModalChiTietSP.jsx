import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  notification,
  Select,
  Modal,
  Image,
  Table,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getListCTSanPham } from "../../redux/slice/chitietsanphamSlice";

function ModalChiTietSP({ visible, onCancel, data }) {
  const dispatch = useDispatch();
  const [listCTSanPham, setListCTSanPham] = useState();
  useEffect(() => {
    if (data) {
      dispatch(getListCTSanPham(data.idSanPham)).then((res) => {
        setListCTSanPham(res.payload.result);
      });
    }
  }, [data, dispatch]);
  console.log(listCTSanPham);

  const columns = [
    // {
    //   title: "STT",
    //   dataIndex: "idChiTietSanPham",
    //   key: "id",
    //   width: 100,
    //   render: (val, record, index) => <>{index + 1}</>,
    // },
    {
      title: "Màu Sắc",
      dataIndex: "mausac",
      key: "mausac",
      width: 500,
      render: (val, record) => <>{record.mausac.tenmausac}</>,
    },
    {
      title: "Kích Cỡ",
      dataIndex: "kichco",
      key: "kichco",
      width: 500,
      render: (val, record) => <>{record.kichco.tenkichco}</>,
    },
    {
      title: "Đế giày",
      dataIndex: "degiay",
      key: "degiay",
      width: 500,
      render: (val, record) => <>{record.degiay.tendegiay}</>,
    },
    {
      title: "Đơn giá",
      dataIndex: "dongia",
      key: "dongia",
      width: 500,
    },
    {
      title: "Số lượng",
      dataIndex: "soluongton",
      key: "soluongton",
      width: 500,
    },
    {
      title: "Hình ảnh",
      dataIndex: "logo",
      key: "logo",
      render: (_, record) => (
        <Image
          src={`http://localhost:8080/api/v1/thuonghieu/logo/${record.tenhinhanh}`}
          width={50}
        />
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   width: 300,
    //   render: (_, record) => (
    //     <Tag
    //       color={record.trangthai == 1 ? "green" : "red"}
    //       key={record.status}
    //     >
    //       {record.trangthai == 1 ? "Visible" : "Invisible"}
    //     </Tag>
    //   ),
    // },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button
    //         onClick={() => openModalUpdate(record)}
    //         type="primary"
    //         icon={<MdModeEditOutline />}
    //       >
    //         Edit
    //       </Button>
    //       <Button
    //         onClick={() => openModalDetail(record)}
    //         icon={<EyeOutlined />}
    //       >
    //         View
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <Modal
        title="Chi Tiết Sản Phẩm"
        open={visible}
        onCancel={onCancel}
        id="tableProduct"
        footer={null}
        width={1200}
      >
        <b style={{ fontSize: "20px" }}>Thông tin sản phẩm</b>
        <div className="mt-3 d-flex justify-content-between">
          <p style={{ fontSize: "15px" }}>
            Tên Sản Phẩm: <b>{data?.tensanpham}</b>
          </p>
          <p style={{ fontSize: "15px" }}>
            Thương hiệu: <b>{data?.thuonghieu.tenthuonghieu}</b>
          </p>
          <p style={{ fontSize: "15px" }}>
            Trạng Thái: <b>{data?.trangthai == 1 ? "Visible" : "Invisible"}</b>
          </p>
        </div>
        <div className="mt-5">
          <b style={{ fontSize: "20px" }}>Thông tin chi tiết</b>
          <Table
            columns={columns}
            dataSource={listCTSanPham}
            pagination={false}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalChiTietSP;
