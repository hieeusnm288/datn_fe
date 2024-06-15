import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Space, Table, Tag } from "antd";
import { jwtDecode } from "jwt-decode";
import { getListOrder } from "../../redux/slice/orderSlice";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function ListOrderClient() {
  const dispatch = useDispatch();
  const { listOrder, totalElements } = useSelector((state) => state.order);
  const [username, setUsername] = useState("");
  const [pargam, setPargam] = useState({
    name: username,
    page: 0,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      if (userData) {
        setUsername(userData.sub + "");
      }
    }
  }, []);
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
            onClick={() => navigate(`/order-detail/${record.id}`)}
            type="primary"
            icon={<EyeOutlined />}
          >
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <p>Danh sách đơn hàng của tôi</p>
      <Table columns={columns} dataSource={listOrder} pagination={false} />
      <Pagination
        total={totalElements}
        onChange={conChangePage}
        style={{ float: "right", marginTop: "20px" }}
        pageSize={5}
      />
    </div>
  );
}

export default ListOrderClient;
