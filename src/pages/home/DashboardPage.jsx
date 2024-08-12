import React, { useEffect, useState } from "react";
import { Card, DatePicker } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashbordpage.scss";
import {
  getDoanhThu,
  getHoaDonByYear,
  getSanPhamBanChay,
  getSanPhamSapHet,
  getTongHoaDonHTByThang,
  getTongHoaDonHTByYear,
  getTongHoaTheoThang,
  getTongKhachHnang,
} from "../../redux/slice/thongkeSlice";
import { useDispatch, useSelector } from "react-redux";
const { RangePicker } = DatePicker;
const { Meta } = Card;
function DashboardPage() {
  const dispatch = useDispatch();
  const [doanhThu, setDoanhThu] = useState();
  const [hoaDonTong, setHoaDonTong] = useState();
  const [hoaDonHoanThanh, setHoaDonHoanThanh] = useState();
  const [hoaDonTongMonth, setHoaDonTongMonth] = useState();
  const [hoaDonHoanThanhMonth, setHoaDonHoanThanhMonth] = useState();
  const [listSanPhamBanChay, setListSanPhamBanChay] = useState();
  const [listSanPhamSapHet, setListSanPhamSapHet] = useState();
  const [khachHang, setKhachHang] = useState();
  useEffect(() => {
    dispatch(getDoanhThu()).then((res) => {
      if (res?.payload?.result) {
        setDoanhThu(res?.payload?.result);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    dispatch(getHoaDonByYear(year)).then((res) => {
      if (res?.payload?.result) {
        setHoaDonTong(res?.payload?.result);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    dispatch(getTongHoaDonHTByYear(year)).then((res) => {
      if (res?.payload?.result) {
        setHoaDonHoanThanh(res?.payload?.result);
      }
    });
  }, [dispatch]);

  // useEffect(() => {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   const month = now.getMonth() + 1;
  //   dispatch(
  //     getTongHoaDonHTByThang({
  //       month: month,
  //       year: year,
  //     })
  //   ).then((res) => {
  //     if (res?.payload?.result) {
  //       setHoaDonHoanThanhMonth(res?.payload?.result);
  //     }
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   const month = now.getMonth() + 1;
  //   dispatch(
  //     getTongHoaTheoThang({
  //       month: month,
  //       year: year,
  //     })
  //   ).then((res) => {
  //     if (res?.payload?.result) {
  //       setHoaDonTongMonth(res?.payload?.result);
  //     }
  //   });
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getTongKhachHnang()).then((res) => {
      if (res?.payload?.result) {
        setKhachHang(res?.payload?.result);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    dispatch(
      getSanPhamBanChay({
        month: month,
        year: year,
      })
    ).then((res) => {
      if (res?.payload?.result) {
        setListSanPhamBanChay(res?.payload?.result);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSanPhamSapHet()).then((res) => {
      if (res?.payload?.result) {
        setListSanPhamSapHet(res?.payload?.result);
      }
    });
  }, [dispatch]);

  const onChangeDate = (dates, dateStrings) => {
    dispatch(
      getTongHoaDonHTByThang({
        start: dateStrings[0],
        end: dateStrings[1],
      })
    ).then((res) => {
      if (res?.payload?.result) {
        setHoaDonHoanThanhMonth(res?.payload?.result);
      }
    });
    dispatch(
      getTongHoaTheoThang({
        start: dateStrings[0],
        end: dateStrings[1],
      })
    ).then((res) => {
      if (res?.payload?.result) {
        setHoaDonTongMonth(res?.payload?.result);
      }
    });
  };

  return (
    <div className="dashborad-page">
      <div className="row">
        <div className="col-lg-8 d-flex align-items-strech">
          <div
            className="card w-100"
            style={{
              border: "none",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <div className="card-body">
              <div className="d-sm-flex d-block align-items-center justify-content-between mb-5">
                <div className="mb-3 mb-sm-0">
                  <h5 className="card-title fw-semibold">Doanh Thu Theo Năm</h5>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={doanhThu} barSize={30}>
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="thang" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="doanhthu" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div
            className="card overflow-hidden"
            style={{
              border: "none",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <div className="card-body p-4">
              <div className="row">
                <div>
                  <div className="fs-4 fw-bold text-primary">
                    Số Khách Hàng:{" "}
                  </div>
                  <div className="content-text">
                    <div className="content-text fs-5">
                      Số lượng khách hàng:{" "}
                      <span className="fw-bold text-primary">{khachHang}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card overflow-hidden mt-3"
            style={{
              border: "none",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <div className="card-body p-4">
              <div className="row">
                <div>
                  <div className="fs-4 fw-bold text-primary">
                    Tổng Hóa Đơn Trong Năm
                  </div>
                  <div className="content-text fs-5">
                    Tổng Hóa Đơn:{" "}
                    <span className="fw-bold text-primary">{hoaDonTong}</span>
                  </div>
                  <div className="content-text fs-5">
                    Hóa Đơn Hoàn Thành:{" "}
                    <span className="fw-bold text-primary">
                      {hoaDonHoanThanh}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card overflow-hidden mt-3"
            style={{
              border: "none",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <div className="card-body p-4">
              <div className="row">
                <div>
                  <div className="fs-4 fw-bold text-primary">
                    Tổng Hóa Đơn Trong Khoảng Thời Gian
                    <RangePicker onChange={onChangeDate} />
                  </div>
                  <div className="content-text fs-5">
                    Tổng Hóa Đơn:{" "}
                    <span className="fw-bold text-primary">
                      {hoaDonTongMonth}
                    </span>
                  </div>
                  <div className="content-text fs-5">
                    Hóa Đơn Hoàn Thành:{" "}
                    <span className="fw-bold text-primary">
                      {hoaDonHoanThanhMonth}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h5>Sản Phẩm Bán Nhiều Trong Tháng</h5>
        <div className="d-flex" style={{ gap: 20 }}>
          {listSanPhamBanChay?.map((i) => (
            <Card
              style={{
                width: 240,
              }}
              cover={
                <img
                  alt="example"
                  style={{ width: "100%", height: "300px" }}
                  src={`http://localhost:8080/api/v1/thuonghieu/logo/${i.hinhAnh}`}
                />
              }
            >
              <b className="fs-6">{i?.tenSanPham}</b>
              <p className="fs-8">
                Màu Sắc: {i?.mauSac}, Kích Cỡ: {i?.kichCo}
              </p>
              <p className="fs-8">Số lượng bán: {i?.soLuong}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <h5>Sản Phẩm Sắp Hết</h5>
        <div className="d-flex" style={{ gap: 20 }}>
          {listSanPhamSapHet?.map((i) => (
            <Card
              style={{
                width: 240,
              }}
              cover={
                <img
                  alt="example"
                  style={{ width: "100%", height: "300px" }}
                  src={`http://localhost:8080/api/v1/thuonghieu/logo/${i.hinhAnh}`}
                />
              }
            >
              <b className="fs-6">{i?.tenSanPham}</b>
              <p className="fs-8">
                Màu Sắc: {i?.mauSac}, Kích Cỡ: {i?.kichCo}
              </p>
              <p className="fs-8">Số lượng còn lại: {i?.soLuong}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
