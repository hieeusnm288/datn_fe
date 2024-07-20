import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Space, Table, Tag } from "antd";
import { jwtDecode } from "jwt-decode";
import { getListDonHangById } from "../../redux/slice/donHangSlice";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function ListOrderClient() {
  const dispatch = useDispatch();
  // const { listOrder, totalElements } = useSelector((state) => state.order);
  const [listOrder, setListOrder] = useState();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      dispatch(getListDonHangById(userData.id)).then((res) => {
        if (res?.payload?.result) {
          setListOrder(res?.payload?.result);
        }
      });
    }
  }, [dispatch]);
  // console.log(listOrder);
  const columns = [
    {
      title: "STT",
      dataIndex: "idHoaDon",
      key: "idHoaDon",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngaytao",
      key: "ngaytao",
      width: 600,
      render: (_, record) => <>{moment(record.ngaytao).format("DD/MM/YYYY")}</>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: 900,
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
      width: 900,
      render: (_, record) => (
        <>{record.phuongThucThanhToan.hinhthuc.trimEnd()}</>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 900,
      render: (_, record) => (
        <>
          <>{record.trangThaiHoaDon.tentrangthai.trimEnd()}</>
        </>
      ),
    },
    {
      title: "Tổng Tiền",
      dataIndex: "status",
      key: "status",
      width: 900,
      render: (_, record) => (
        <>
          <>{record.tongtien?.toLocaleString("vi-VN")} VND</>
        </>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => navigate(`/order-detail/${record.idHoaDon}`)}
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
      {/* <Pagination
        total={totalElements}
        onChange={conChangePage}
        style={{ float: "right", marginTop: "20px" }}
        pageSize={5}
      /> */}
    </div>
  );
}

export default ListOrderClient;
