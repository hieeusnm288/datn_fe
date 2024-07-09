import React, { useEffect, useState } from "react";
import { getListKichCo, deleteKichCo } from "../../redux/slice/kichcoSlice";
import { Button, Space, Table, Modal, Tag, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ListKichCo() {
  const { listKichCo } = useSelector((state) => state.kichco);
  const [kichCoDetail, setKichCoDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListKichCo());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate(`/admin/kichco/add/${data?.idKichCo}`);
  };
  const showModal = (data) => {
    setIsModalOpen(true);
    setKichCoDetail(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deleteKichCo(kichCoDetail?.idKichCo)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        dispatch(getListKichCo());
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "idKichCo",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên Kích Cỡ",
      dataIndex: "tenkichco",
      key: "tenkichco",
      width: 500,
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
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
      <p>Danh Sách Kích Cỡ</p>
      <Table
        columns={columns}
        dataSource={listKichCo}
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
          Bạn có muốn xóa Kích cỡ: {kichCoDetail ? kichCoDetail.tenkichco : ""}
        </p>
      </Modal>
    </>
  );
}

export default ListKichCo;
