import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Space,
  Table,
  Modal,
  Radio,
  notification,
  Pagination,
  Input,
  Select,
} from "antd";
import { getListDonHang, updateDonHang } from "../../redux/slice/donHangSlice";
import { getListDonHangCT } from "../../redux/slice/donhangchitietSlice";
import { getListTrangThai } from "../../redux/slice/trangthaihoadonSlice";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function ListOrderAdmin() {
  const dispatch = useDispatch();
  const { Option } = Select;
  const [listOder, setListOrder] = useState();
  const [donHangCT, setDonHangCT] = useState();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTT, setIsModalOpenTT] = useState(false);
  const [detailHoaDon, setDetailHoaDon] = useState();
  const [listTT, setListTT] = useState();
  const [value, setValue] = useState(1);
  const [search, setSearch] = useState({
    username: "",
    idTrangThai: 0,
    page: 0,
  });
  const [searchInput, setSearchInput] = useState();
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [trangThai, setTrangThai] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getListDonHang(search)).then((res) => {
      if (res?.payload?.result) {
        setListOrder(res?.payload?.result.content);
        setTotalElements(res?.payload?.result.page.totalElements);
        setTotalPages(res?.payload?.result.page.totalPages);
      }
    });
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(getListTrangThai()).then((res) => {
      if (res?.payload?.result) {
        setListTT(res?.payload?.result);
      }
    });
  }, [dispatch]);
  const showModal = (data) => {
    setDetailHoaDon(data);
    console.log(data);
    setValue(data.trangThaiHoaDon.idTrangThaiHoaDon);
    dispatch(getListDonHangCT(data?.idHoaDon)).then((res) => {
      if (res?.payload?.result) {
        setDonHangCT(res?.payload?.result);
      }
    });
    setIsModalOpen(true);
  };

  const showModalTT = () => {
    setIsModalOpenTT(true);
  };

  const handleOk = () => {
    const date = new Date(detailHoaDon.ngaytao);
    dispatch(
      updateDonHang({
        id: detailHoaDon.idHoaDon,
        idKhachHang: detailHoaDon.khachHang.idKhachHang,
        idKhuyenMai: detailHoaDon.khuyenMai
          ? detailHoaDon.khuyenMai.idKhuyenMai
          : null,
        tongtien: detailHoaDon.tongtien,
        ngaytao: date,
        diachi: detailHoaDon.diachi,
        idPhuongThucThanhToan: detailHoaDon.phuongThucThanhToan.id,
        idTrangThaiDonHang: value,
        idNhanVien: localStorage.getItem("idNhanVien").slice(1, -1),
      })
    ).then((res) => {
      if (res?.payload?.result) {
        setIsModalOpenTT(false);
        setIsModalOpen(false);
        setValue();
        dispatch(getListDonHang(search)).then((res) => {
          if (res?.payload?.result) {
            setListOrder(res?.payload?.result.content);
          }
        });
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
      } else {
        notification.open({
          message: "Thất bại!",
          description: "Cập nhật không hợp lệ",
          type: "error",
        });
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // console.log(detailHoaDon);
  const handleCancelTT = () => {
    setIsModalOpenTT(false);
  };

  const conChangePage = (page) => {
    setSearch({
      username: "",
      idTrangThai: 0,
      page: page - 1,
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "idHoaDon",
      key: "idHoaDon",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Khách Hàng",
      dataIndex: "ngaytao",
      key: "ngaytao",
      width: 600,
      render: (_, record) => (
        <>
          {record?.khachHang?.tenkhachhang}(
          {record?.khachHang?.username.trimEnd()})
        </>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngaytao",
      key: "ngaytao",
      width: 600,
      render: (_, record) => (
        <>{moment(record?.ngaytao).format("DD/MM/YYYY")}</>
      ),
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
            onClick={() => showModal(record)}
            type="primary"
            icon={<EyeOutlined />}
          >
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  const columns2 = [
    {
      title: "STT",
      dataIndex: "idChiTietHoaDon",
      key: "idChiTietHoaDon",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "ngaytao",
      key: "ngaytao",
      width: 600,
      render: (_, record) => (
        <>{record?.chiTietSanPham?.sanpham?.tensanpham.trimEnd()}</>
      ),
    },
    {
      title: "Kích Cỡ",
      dataIndex: "diachi",
      key: "diachi",
      width: 200,
      render: (_, record) => (
        <>{record?.chiTietSanPham?.kichco?.tenkichco.trimEnd()}</>
      ),
    },
    {
      title: "Màu Sắc",
      dataIndex: "payment",
      key: "mausac",
      width: 200,
      render: (_, record) => (
        <>{record?.chiTietSanPham?.mausac?.tenmausac.trimEnd()}</>
      ),
    },
    {
      title: "Đơn Giá",
      dataIndex: "payment",
      key: "dongia",
      width: 400,
      render: (_, record) => (
        <>{record?.chiTietSanPham?.dongia?.toLocaleString("vi-VN")} VND</>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "payment",
      key: "soluong",
      width: 200,
      render: (_, record) => <>{record.soluong}</>,
    },
  ];
  const conChange = (e) => {
    setSearchInput(e.target.value);
  };
  const onChangeTT = (value) => {
    setTrangThai(value);
    setSearch({
      username: searchInput ? searchInput : "",
      idTrangThai: value,
      page: 0,
    });
  };
  const onSearch = () => {
    setSearch({
      username: searchInput,
      idTrangThai: trangThai ? trangThai : 0,
      page: 0,
    });
  };
  return (
    <div>
      <p>Danh sách đơn hàng</p>
      <div className="d-flex justify-content-between mb-3">
        <div style={{ width: "40%" }}>
          <label className="mb-1">Tìm kiếm theo username khách hàng</label>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input placeholder="Nhập tên username" onChange={conChange} />
            <Button type="primary" onClick={onSearch}>
              Tìm Kiếm
            </Button>
          </Space.Compact>
        </div>
        <div style={{ width: "40%" }}>
          <label className="mb-1">Lọc theo trạng thái</label>
          <div>
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
        </div>
      </div>
      <Table columns={columns} dataSource={listOder} pagination={false} />
      <Pagination
        onChange={conChangePage}
        className="mt-3"
        defaultCurrent={1}
        total={totalElements}
        size={8}
        style={{ float: "right" }}
      />
      <Modal
        title="Chi Tiết Đơn Hàng"
        open={isModalOpen}
        onCancel={handleCancel}
        width={1200}
        footer={null}
      >
        <div>
          <div className="d-flex justify-content-between">
            <b style={{ fontSize: "20px" }}>1. Thông Tin Đơn Hàng</b>
            <Button onClick={showModalTT}>Cập nhật trạng thái</Button>
          </div>
          <div className="d-flex justify-content-between flex-wrap mt-3">
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Trạng Thái Hóa Đơn: </b>
              {detailHoaDon?.trangThaiHoaDon?.tentrangthai.trimEnd()}
            </p>
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Phương Thức Thanh Toán: </b>
              {detailHoaDon?.phuongThucThanhToan?.hinhthuc.trimEnd()}
            </p>
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Tổng Tiền: </b>
              {detailHoaDon?.tongtien?.toLocaleString("vi-VN")} VND
            </p>
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Địa Chỉ: </b>
              {detailHoaDon?.diachi.trimEnd()}
            </p>
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Ngày Tạo: </b>
              {moment(detailHoaDon?.ngaytao).format("DD/MM/YYYY")}
            </p>
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Cập nhật bởi: </b>
              {detailHoaDon?.nhanVien?.username}
            </p>
          </div>
        </div>
        <hr />
        <div>
          <b style={{ fontSize: "20px" }}>2. Thông Tin Khách Hàng</b>
          <div className="d-flex justify-content-between flex-wrap mt-1">
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Họ và Tên: </b>
              {detailHoaDon?.khachHang?.tenkhachhang.trimEnd()}
            </p>
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Email: </b>
              {detailHoaDon?.khachHang?.email.trimEnd()}
            </p>
            <p style={{ fontSize: "18px" }} className="mt-1">
              <b>Số điện thoại: </b>
              {detailHoaDon?.khachHang?.sodienthoai?.trimEnd()}
            </p>
          </div>
        </div>
        <hr />
        <div>
          <b style={{ fontSize: "20px" }}>3. Danh Sách Sản Phẩm</b>
          <Table columns={columns2} dataSource={donHangCT} pagination={false} />
        </div>
      </Modal>
      <Modal
        title="Cập nhật trạng thái"
        open={isModalOpenTT}
        onOk={handleOk}
        onCancel={handleCancelTT}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {listTT?.map((i) => (
              <Radio value={i?.idTrangThaiHoaDon}>
                {i?.tentrangthai.trimEnd()}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
}

export default ListOrderAdmin;
