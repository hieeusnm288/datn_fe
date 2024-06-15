import { Table } from "antd";
import React from "react";
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
function DashboardPage() {
  const data = [
    {
      name: "T1",
      pv: 2400,
    },
    {
      name: "T2",
      pv: 1398,
    },
    {
      name: "T3",
      pv: 9800,
    },
    {
      name: "T4",
      pv: 3908,
    },
    {
      name: "T5",
      pv: 4800,
    },
    {
      name: "T6",
      pv: 3800,
    },
    {
      name: "T7",
      pv: 1300,
    },
    {
      name: "T8",
      pv: 2300,
    },
    {
      name: "T9",
      pv: 3300,
    },
    {
      name: "T10",
      pv: 6300,
    },
    {
      name: "T11",
      pv: 4120,
    },
    {
      name: "T12",
      pv: 1300,
    },
  ];

  const data2 = [
    {
      name: "Page A",
      pv: 1800,
    },
    {
      name: "Page B",
      pv: 1098,
    },
    {
      name: "Page C",
      pv: 2000,
    },
    {
      name: "Page D",
      pv: 1008,
    },
  ];

  const dataTable2 = [
    {
      id: 1,
      name: "Nguyen Minh Hieu",
      order: 7,
      total: 5000000,
    },
    {
      id: 2,
      name: "Nguyen Minh Hoang",
      order: 3,
      total: 3000000,
    },
    {
      id: 3,
      name: "Nguyen Minh Long",
      order: 3,
      total: 2000000,
    },
    {
      id: 4,
      name: "Nguyen Minh Kien",
      order: 2,
      total: 2000000,
    },
  ];

  const dataTable1 = [
    {
      id: 1,
      name: "Laptop Gaming 1",
      quantity: 10,
    },
    {
      id: 2,
      name: "PC Gaming 1",
      quantity: 7,
    },
    {
      id: 3,
      name: "Laptop Gaming 2",
      quantity: 6,
    },
    {
      id: 4,
      name: "PC Gaming 2",
      quantity: 4,
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 700,
    },
    {
      title: "Total Purchases",
      dataIndex: "quantity",
      key: "quantity",
      width: 200,
    },
  ];

  const columns2 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      width: 700,
    },
    {
      title: "Total Order",
      dataIndex: "order",
      key: "order",
      width: 200,
    },
    {
      title: "Total payment",
      dataIndex: "total",
      key: "toal",
      width: 400,
      render: (_, record) => <>{record.total.toLocaleString("vi-VN")}</>,
    },
  ];

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
                  <h5 className="card-title fw-semibold">
                    Sales Overview (Đang Fix Cứng Trang Dashborad)
                  </h5>
                </div>
                <div>
                  <select className="form-select">
                    <option value="1">2024</option>
                    <option value="2">2025</option>
                    <option value="3">2026</option>
                    <option value="4">2027</option>
                  </select>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} barSize={30}>
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Bar dataKey="pv" fill="#8884d8" />
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
                <div className="col-4">
                  <div className="fs-2 fw-bold text-primary">
                    60<span className="ml-1">+</span>
                  </div>
                  <div className="content-text">Products sold in month</div>
                </div>
                <div className="col-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data2}>
                      <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
                <div className="col-4">
                  <div className="fs-2 fw-bold text-primary">
                    50<span className="ml-1">+</span>
                  </div>
                  <div className="content-text">Total Orders in month</div>
                </div>
                <div className="col-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data2}>
                      <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
                <div className="col-4">
                  <div className="fs-2 fw-bold text-primary">
                    100<span className="ml-1">+</span>
                  </div>
                  <div className="content-text">Customers</div>
                </div>
                <div className="col-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data2}>
                      <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <div
              className="card w-100"
              style={{
                border: "none",
                boxShadow:
                  "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              }}
            >
              <div className="card-body">
                <div className="mb-3 mb-sm-0">
                  <h5 className="card-title fw-semibold">Top Client</h5>
                  <Table
                    columns={columns2}
                    dataSource={dataTable2}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div
              className="card w-100"
              style={{
                border: "none",
                boxShadow:
                  "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              }}
            >
              <div className="card-body">
                <div className="mb-3 mb-sm-0">
                  <h5 className="card-title fw-semibold">Top Product</h5>
                  <Table
                    columns={columns}
                    dataSource={dataTable1}
                    pagination={false}
                  />
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
