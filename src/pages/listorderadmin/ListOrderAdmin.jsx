import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Space, Table, Tag, Modal, Image } from "antd";
import {
  cancelOrder,
  confirmOrder,
  getDetailOrder,
  getListOrder,
} from "../../redux/slice/orderSlice";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function ListOrderAdmin() {
  const dispatch = useDispatch();
  const [detailOrder, setDetailOrder] = useState();
  const { listOrder, totalElements } = useSelector((state) => state.order);
  const [username, setUsername] = useState("");
  const [pargam, setPargam] = useState({
    name: username,
    page: 0,
  });
  const [idOrder, setIdOrder] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getListOrder(pargam));
  }, [dispatch, pargam]);

  const conChangePage = (page) => {
    dispatch(
      getListOrder({
        name: username,
        page: page - 1,
      })
    );
  };

  const onConfrimOrder = () => {
    dispatch(confirmOrder(idOrder)).then((res) => {
      if (res.payload) {
        dispatch(getListOrder(pargam));
        setOpen(false);
      }
    });
  };
  const onCancelOrder = () => {
    dispatch(cancelOrder(idOrder)).then((res) => {
      if (res.payload) {
        dispatch(getListOrder(pargam));
        setOpen(false);
      }
    });
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
      title: "Ngày đặt",
      dataIndex: "createDate",
      key: "createDate",
      width: 600,
      render: (_, record) => (
        <>{moment(record.createDate).format("DD/MM/YYYY")}</>
      ),
    },
    {
      title: "Username Khách Hàng",
      dataIndex: "account",
      key: "account",
      width: 900,
      render: (_, record) => <>{record.account.username}</>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 900,
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
      width: 900,
      render: (_, record) => (
        <>
          {record.payment === 1
            ? "Thanh toán khi nhận hàng"
            : "Thanh toám chuyển khoản"}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 900,
      render: (_, record) => (
        <>
          {record.status === 0 ? (
            <Tag color="error">Đơn hàng đã hủy</Tag>
          ) : record.status === 1 ? (
            <Tag color="processing">Chờ xác nhận</Tag>
          ) : (
            <Tag color="success">Đã xác nhận</Tag>
          )}
        </>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => showModal(record)}
            type="primary"
            icon={<EyeOutlined />}
          >
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  const columnsProduct = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Ảnh",
      dataIndex: "img",
      key: "id",
      width: 500,
      render: (_, record) => (
        <Image
          src={`https://springbe-production.up.railway.app/api/v1/product/image/${record.product.image}`}
          width={50}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "id",
      width: 900,
      render: (_, record) => <>{record.product.name}</>,
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "id",
      width: 300,
      render: (_, record) => (
        <>{record.product.price.toLocaleString("vi-VN")}</>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "id",
      width: 300,
      render: (_, record) => <>{record.product.quantity}</>,
    },
  ];

  const showModal = (order) => {
    setIdOrder(order.id);
    dispatch(getDetailOrder(order.id)).then((res) => {
      setDetailOrder(res.payload);
    });
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <p>Danh sách đơn hàng</p>
      <Table columns={columns} dataSource={listOrder} pagination={false} />
      <Pagination
        total={totalElements}
        onChange={conChangePage}
        style={{ float: "right", marginTop: "20px" }}
        pageSize={5}
      />
      <Modal
        open={open}
        title="Chi tiết đơn hàng"
        onCancel={handleCancel}
        width="90%"
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button type="primary" onClick={onConfrimOrder}>
              Xác nhận đơn hàng
            </Button>
            <Button type="primary" danger onClick={onCancelOrder}>
              Hủy đơn hàng
            </Button>
          </>
        )}
      >
        <Table
          columns={columnsProduct}
          dataSource={detailOrder}
          pagination={false}
        />
      </Modal>
    </div>
  );
}

export default ListOrderAdmin;
