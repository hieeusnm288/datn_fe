import React, { useEffect, useState } from "react";
import { getListPTTT, deletePTTT } from "../../redux/slice/ptttSlice";
import { Button, Space, Table, Modal, Tag, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ListPTTT() {
  const { listPTTT } = useSelector((state) => state.pttt);
  const [ptttDetail, setPtttDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListPTTT());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate(`/admin/pttt/add/${data?.id}`);
  };
  const showModal = (data) => {
    setIsModalOpen(true);
    setPtttDetail(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deletePTTT(ptttDetail?.id)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        dispatch(getListPTTT());
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Phương Thúc Thanh Toán",
      dataIndex: "hinhthuc",
      key: "hinhthuc",
      width: 1000,
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
      <p>Danh Sách Phương Thức Thanh Toán</p>
      <Table
        columns={columns}
        dataSource={listPTTT}
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
          Bạn có muốn xóa Phương Thúc Thanh Toán:{" "}
          {ptttDetail ? ptttDetail.hinhthuc : ""}
        </p>
      </Modal>
    </>
  );
}

export default ListPTTT;
