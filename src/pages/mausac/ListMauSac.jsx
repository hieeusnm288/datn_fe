import React, { useEffect, useState } from "react";
import { getListMauSac, deleteMauSac } from "../../redux/slice/mausacSlice";
import { Button, Space, Table, Modal, Tag, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ListMauSac() {
  const { listMauSac } = useSelector((state) => state.mausac);
  const [mauSacDetail, setMauSacDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListMauSac());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate(`/admin/mausac/add/${data?.idMauSac}`);
  };
  const showModal = (data) => {
    setIsModalOpen(true);
    setMauSacDetail(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deleteMauSac(mauSacDetail?.idMauSac)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        dispatch(getListMauSac());
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "idMauSac",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên Kích Cỡ",
      dataIndex: "tenmausac",
      key: "tenmausac",
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
        dataSource={listMauSac}
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
          Bạn có muốn xóa Kích cỡ: {mauSacDetail ? mauSacDetail.tenmausac : ""}
        </p>
      </Modal>
    </>
  );
}

export default ListMauSac;
