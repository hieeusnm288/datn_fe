import React, { useEffect, useState } from "react";
import { Button, Space, Table, Modal, Tag, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  getlistKhuyenMai,
  deleteKhuyenMai,
} from "../../redux/slice/khuyenmaiSlice";
import moment from "moment";
function ListKM() {
  const { listKhuyenMai, totalElements } = useSelector(
    (state) => state.khuyenmai
  );
  const [khuyenmaiDetail, setKhuyenMaiDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getlistKhuyenMai());
  }, [dispatch]);
  const navigate = useNavigate();
  const handleEdit = (data) => {
    navigate(`/admin/khuyenmai/add/${data?.idKhuyenMai}`);
  };
  const showModal = (data) => {
    setIsModalOpen(true);
    setKhuyenMaiDetail(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deleteKhuyenMai(khuyenmaiDetail?.idKhuyenMai)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        dispatch(getlistKhuyenMai());
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "idKhuyenMai",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Mã Khuyễn Mại",
      dataIndex: "makhuyenmai",
      key: "name",
      width: 500,
    },
    {
      title: "Phần trăn giảm",
      dataIndex: "record",
      key: "phamtramgiam",
      width: 300,
      render: (_, record) => <>{record.phamtramgiam}%</>,
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "ngaybatdau",
      key: "ngaybatdau",
      width: 300,
      render: (_, record) => (
        <>{moment(record.ngaybatdau).format("DD/MM/YYYY")}</>
      ),
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "ngayketthuc",
      key: "ngayketthuc",
      width: 300,
      render: (_, record) => (
        <>{moment(record.ngayketthuc).format("DD/MM/YYYY")}</>
      ),
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
      <p>Danh Sách KHuyến Mại</p>
      <Table
        columns={columns}
        dataSource={listKhuyenMai}
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
          Bạn có muốn xóa Mã Khuyến mại:{" "}
          {khuyenmaiDetail ? khuyenmaiDetail.makhuyenmai : ""}
        </p>
      </Modal>
    </>
  );
}

export default ListKM;
