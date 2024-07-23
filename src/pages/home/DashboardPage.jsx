import React, { useEffect, useState } from "react";
import { Table } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Dashbordpage.scss";
import {
  getDoanhThu,
  getTongHoaDon,
  getTongHoaDonHT,
  getTongKhachHnang,
} from "../../redux/slice/thongkeSlice";
import { useDispatch, useSelector } from "react-redux";

function DashboardPage() {
  const dispatch = useDispatch();
  const [doanhThu, setDoanhThu] = useState();
  const [hoaDonTong, setHoaDonTong] = useState();
  const [hoaDonHoanThanh, setHoaDonHoanThanh] = useState();
  const [khachHang, setKhachHang] = useState();
  useEffect(() => {
    dispatch(getDoanhThu()).then((res) => {
      if (res?.payload?.result) {
        setDoanhThu(res?.payload?.result);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTongHoaDon()).then((res) => {
      if (res?.payload?.result) {
        setHoaDonTong(res?.payload?.result);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTongHoaDonHT()).then((res) => {
      if (res?.payload?.result) {
        setHoaDonHoanThanh(res?.payload?.result);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTongKhachHnang()).then((res) => {
      if (res?.payload?.result) {
        setKhachHang(res?.payload?.result);
      }
    });
  }, [dispatch]);

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
                  <div className="fs-2 fw-bold text-primary">{khachHang}</div>
                  <div className="content-text">Số Khách Hàng</div>
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
                  <div className="fs-2 fw-bold text-primary">{hoaDonTong}</div>
                  <div className="content-text">Tổng Hóa Đơn</div>
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
                  <div className="fs-2 fw-bold text-primary">
                    {hoaDonHoanThanh}
                  </div>
                  <div className="content-text">Hóa đơn đã hoàn thành</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
