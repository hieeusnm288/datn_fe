import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Select, Space, Table, Tag } from "antd";
import { jwtDecode } from "jwt-decode";
import { getListDonHang } from "../../redux/slice/donHangSlice";
import { getListTrangThai } from "../../redux/slice/trangthaihoadonSlice";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function ListOrderClient() {
  const dispatch = useDispatch();
  // const { listOrder, totalElements } = useSelector((state) => state.order);
  const [listOrder, setListOrder] = useState();
  const [username, setUsername] = useState("");
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [trangThai, setTrangThai] = useState();
  const [listTT, setListTT] = useState();
  const { Option } = Select;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListTrangThai()).then((res) => {
      if (res?.payload?.result) {
        setListTT(res?.payload?.result);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      setUsername(userData.sub + "");
      console.log(userData);
      dispatch(
        getListDonHang({
          username: userData.sub.trimEnd(),
          idTrangThai: 0,
          page: 0,
        })
      ).then((res) => {
        if (res?.payload?.result) {
          setListOrder(res?.payload?.result.content);
          setTotalElements(res?.payload?.result.page.totalElements);
          setTotalPages(res?.payload?.result.page.totalPages);
        }
      });
    }
  }, [dispatch]);
  // console.log(listOrder);

  console.log(username);

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
  const onChangeTT = (value) => {
    setTrangThai(value);
    dispatch(
      getListDonHang({
        username: username.trimEnd(),
        idTrangThai: value,
        page: 0,
      })
    ).then((res) => {
      if (res?.payload?.result) {
        setListOrder(res?.payload?.result.content);
        setTotalElements(res?.payload?.result.page.totalElements);
        setTotalPages(res?.payload?.result.page.totalPages);
      }
    });
  };
  const conChangePage = (page) => {
    dispatch(
      getListDonHang({
        username: username.trimEnd(),
        idTrangThai: trangThai ? trangThai : 0,
        page: page - 1,
      })
    ).then((res) => {
      if (res?.payload?.result) {
        setListOrder(res?.payload?.result.content);
        setTotalElements(res?.payload?.result.page.totalElements);
        setTotalPages(res?.payload?.result.page.totalPages);
      }
    });
  };

  return (
    <div>
      <p>Danh sách đơn hàng của tôi</p>
      <label className="mb-1">Lọc theo trạng thái</label>
      <div className="mb-3">
        <Select
          placeholder="Chọn Trạng Thái"
          style={{ width: "100%" }}
          onChange={onChangeTT}
        >
          <Option value={0}>Tất cả</Option>
          {listTT?.map((i) => (
            <Option value={i?.idTrangThaiHoaDon}>
              {i?.tentrangthai.trimEnd()}
            </Option>
          ))}
        </Select>
      </div>
      <Table columns={columns} dataSource={listOrder} pagination={false} />
      <Pagination
        onChange={conChangePage}
        className="mt-3"
        defaultCurrent={1}
        total={totalElements}
        size={8}
        style={{ float: "right" }}
      />
    </div>
  );
}

export default ListOrderClient;
