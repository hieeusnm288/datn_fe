import React, { useEffect, useState } from "react";
import { getListDeGiay, deleteDeGiay } from "../../redux/slice/degiaySlice";
import { Button, Space, Table, Modal, Tag, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ListDeGiay() {
  const { listDeGiay } = useSelector((state) => state.degiay);
  const [deGiayDetail, setDeGiayDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  console.log(listDeGiay);

  useEffect(() => {
    dispatch(getListDeGiay());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate(`/admin/degiay/add/${data?.idDeGiay}`);
  };
  const showModal = (data) => {
    setIsModalOpen(true);
    setDeGiayDetail(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deleteDeGiay(deGiayDetail?.idDeGiay)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        dispatch(getListDeGiay());
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "idDeGiay",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên Đế Giày",
      dataIndex: "tendegiay",
      key: "name",
      width: 500,
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
      <p>Danh Sách Đế Giày</p>
      <Table
        columns={columns}
        dataSource={listDeGiay}
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
          Bạn có muốn xóa Đế giày: {deGiayDetail ? deGiayDetail.tendegiay : ""}
        </p>
      </Modal>
    </>
  );
}

export default ListDeGiay;
