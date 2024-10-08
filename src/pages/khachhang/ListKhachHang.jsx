import React, { useEffect, useState } from "react";
import { Button, Space, Table, Modal, Tag, notification } from "antd";
import {
  getListKhachHang,
  deleteKhachHang,
} from "../../redux/slice/khachhangSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function ListKhachHang() {
  const { listKhachHang, totalElements } = useSelector(
    (state) => state.khachhang
  );

  const [nhanvienDetail, setNhanVienDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListKhachHang());
  }, [dispatch]);
  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate(`/admin/khachhang/add/${data?.idKhachHang}`);
  };
  const showModal = (data) => {
    setIsModalOpen(true);
    setNhanVienDetail(data);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deleteKhachHang(nhanvienDetail?.idKhachHang)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        dispatch(getListKhachHang());
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "idKhachHang",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "tenkhachhang",
      key: "name",
      width: 500,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 300,
    },
    {
      title: "Số điện thoại",
      dataIndex: "sodienthoai",
      key: "sodienthoai",
      width: 300,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 300,
    },
    {
      title: "Giới tính",
      dataIndex: "gioitinh",
      key: "gioitinh",
      width: 100,
      render: (_, record) => <>{record.gioitinh === 1 ? "Nam" : "Nữ"}</>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 300,
      render: (_, record) => (
        <Tag
          color={record.trangthai === 1 ? "green" : "red"}
          key={record.status}
        >
          {record.trangthai === 1 ? "Visible" : "Invisible"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            icon={<MdModeEditOutline />}
          >
            Edit
          </Button>
          <Button
            onClick={() => showModal(record)}
            type="primary"
            danger="true"
            icon={<MdDelete />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <p>List Khách Hàng</p>
      <Table
        columns={columns}
        dataSource={listKhachHang}
        pagination={false}
        style={{ cursor: "pointer" }}
      />
      <Modal
        title="Delete Nhân Viên"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Bạn có muốn xóa Khách Hàng:{" "}
          {nhanvienDetail ? nhanvienDetail.tenkhachhang : ""}
        </p>
      </Modal>
    </>
  );
}

export default ListKhachHang;
