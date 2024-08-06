import React, { useEffect, useState } from "react";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { AiOutlineHome } from "react-icons/ai";
import { Menu, Avatar, Popover } from "antd";
import { BiLogoShopify, BiCategoryAlt } from "react-icons/bi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";
import { getNhanVienByUsername } from "../../redux/slice/nhanvienSlice";
import logo from "../../image/logo.png";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { TbBrandShopee } from "react-icons/tb";
// const { Header, Sider, Content } = Layout;
function Dashboard({ children }) {
  // const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  const [tenNhanVien, setTenNhanVien] = useState();
  const navigate = useNavigate();
  const content = (
    <div>
      <p>Đây là Thông báo 1</p>
      <p>Đây là Thông báo 2</p>
      <p>Đây là Thông báo 3</p>
    </div>
  );
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/admin/login");
  };
  const contentAccount = (
    <div>
      <p>{tenNhanVien}</p>
      <p>My Profile</p>
      <p>Đổi mật khẩu</p>
      <p onClick={logout} style={{ cursor: "pointer" }}>
        Đăng xuất
      </p>
    </div>
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      if (userData) {
        setUsername(userData.sub + "");
        setRole(userData.role);
        setTenNhanVien(userData.tennhanvien);
        localStorage.setItem("username", JSON.stringify(userData.sub + ""));
        localStorage.setItem("role", JSON.stringify(userData.role + ""));
      }
    }
  }, []);

  return (
    <div className="dasboard">
      <aside className="left-site">
        <div>
          <div className="brand-name d-flex align-items-center justify-content-between">
            <div className="name-brand text-nowrap mt-3">
              <img src={logo} width={250} />
            </div>
          </div>
          <div className="slide-bar-menu mt-3">
            <Menu
              mode="inline"
              // defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <AiOutlineHome />,
                  label: "Dashboard",
                  onClick: () => navigate("/admin/dashboard"),
                },
                {
                  key: "2",
                  icon: <BiCategoryAlt />,
                  label: "Quản Lý Nhân Viên",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "3",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm Nhân Viên",
                      onClick: () => navigate("/admin/nhanvien/add"),
                    },
                    {
                      key: "4",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Nhân Viên",
                      onClick: () => navigate("/admin/list-nhanvien"),
                    },
                  ],
                },

                {
                  key: "5",
                  icon: <TbBrandShopee />,
                  label: "Quản Lý Sản Phẩm",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "6",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm Sản Phẩm",
                      onClick: () => navigate("/admin/product/add"),
                    },
                    {
                      key: "7",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Sản Phẩm",
                      onClick: () => navigate("/admin/list-products"),
                    },
                  ],
                },
                {
                  key: "8",
                  icon: <BiLogoShopify />,
                  label: "Quản Lý Thương Hiệu",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "9",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm mới Thương Hiệu",
                      onClick: () => navigate("/admin/brand/add"),
                    },
                    {
                      key: "10",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Thương Hiệu",
                      onClick: () => navigate("/admin/list-brands"),
                    },
                  ],
                },
                {
                  key: "12",
                  icon: <BiCategoryAlt />,
                  label: "Quản Lý Khuyến Mại",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "13",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm Mã Khuyến Mại",
                      onClick: () => navigate("/admin/khuyenmai/add"),
                    },
                    {
                      key: "14",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Mã Khuyến Mại",
                      onClick: () => navigate("/admin/list-khuyenmai"),
                    },
                  ],
                },
                {
                  key: "15",
                  icon: <BiCategoryAlt />,
                  label: "Quản Lý Đế Giày",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "16",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm Đế Giày",
                      onClick: () => navigate("/admin/degiay/add"),
                    },
                    {
                      key: "17",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Đế Giày",
                      onClick: () => navigate("/admin/list-degiay"),
                    },
                  ],
                },
                {
                  key: "18",
                  icon: <BiCategoryAlt />,
                  label: "Quản Lý Kích Cỡ",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "19",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm Kích Cỡ",
                      onClick: () => navigate("/admin/kichco/add"),
                    },
                    {
                      key: "20",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Kích Cỡ",
                      onClick: () => navigate("/admin/list-kichco"),
                    },
                  ],
                },
                {
                  key: "20",
                  icon: <BiCategoryAlt />,
                  label: "Quản Lý Màu Sắc",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "21",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm Màu Sắc",
                      onClick: () => navigate("/admin/mausac/add"),
                    },
                    {
                      key: "22",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Màu Sắc",
                      onClick: () => navigate("/admin/list-mausac"),
                    },
                  ],
                },
                {
                  key: "23",
                  icon: <BiCategoryAlt />,
                  label: "Phương Thức Thanh Toán",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "24",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm Phương Thức",
                      onClick: () => navigate("/admin/pttt/add"),
                    },
                    {
                      key: "25",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Phương Thức",
                      onClick: () => navigate("/admin/list-pttt"),
                    },
                  ],
                },
                {
                  key: "26",
                  icon: <BiCategoryAlt />,
                  label: "Quản Lý Khách Hàng",
                  disabled: role === 2 ? false : true,
                  children: [
                    {
                      key: "27",
                      icon: <IoMdAddCircleOutline />,
                      label: "Thêm Khách Hàng",
                      onClick: () => navigate("/admin/khachhang/add"),
                    },
                    {
                      key: "28",
                      icon: <FaRegListAlt />,
                      label: "Danh Sách Khách Hàng",
                      onClick: () => navigate("/admin/list-khachhang"),
                    },
                  ],
                },
                {
                  key: "11",
                  icon: <LiaFileInvoiceDollarSolid />,
                  label: "Hóa Đơn",
                  onClick: () => navigate("/admin/invoice"),
                },
              ]}
            />
          </div>
        </div>
      </aside>
      <div className="body-wrapper">
        <header className="app-header">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Popover
              content={content}
              title="Thông Báo"
              trigger="click"
              placement="bottomLeft"
            >
              <BellOutlined />
            </Popover>
            <div className="navbar-collapse justify-content-end px-0">
              <Popover
                content={contentAccount}
                title="Account"
                trigger="click"
                placement="bottomLeft"
              >
                <Avatar icon={<UserOutlined />}></Avatar>
              </Popover>
            </div>
          </nav>
        </header>
        <div className="container mt-3">{children}</div>
      </div>
      {/* <Layout>
        <Sider trigger={null} collapsible className="fix-top" width={300}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <AiOutlineHome />,
                label: "Home",
                onClick: () => navigate("/"),
              },
              {
                key: "2",
                icon: <BiCategoryAlt />,
                label: "Categories",
                children: [
                  {
                    key: "3",
                    icon: <IoMdAddCircleOutline />,
                    label: "Add Category",
                    onClick: () => navigate("/admin/category/add"),
                  },
                  {
                    key: "4",
                    icon: <FaRegListAlt />,
                    label: "List Categories",
                    onClick: () => navigate("/admin/list-category"),
                  },
                ],
              },
              {
                key: "5",
                icon: <TbBrandShopee />,
                label: "Products",
                children: [
                  {
                    key: "6",
                    icon: <IoMdAddCircleOutline />,
                    label: "Add Product",
                  },
                  {
                    key: "7",
                    icon: <FaRegListAlt />,
                    label: "List Products",
                  },
                ],
              },
              {
                key: "8",
                icon: <BiLogoShopify />,
                label: "Brands",
                children: [
                  {
                    key: "9",
                    icon: <IoMdAddCircleOutline />,
                    label: "Add Brand",
                    onClick: () => navigate("/brand/add"),
                  },
                  {
                    key: "10",
                    icon: <FaRegListAlt />,
                    label: "List Brands",
                    onClick: () => navigate("/list-brands"),
                  },
                ],
              },
              {
                key: "11",
                icon: <LiaFileInvoiceDollarSolid />,
                label: "Invoice",
              },
            ]}
          />
        </Sider>
        <Layout className="fix-content">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Row>
              <Col md={20}>
                <h1>Personal Project: Store Management</h1>
              </Col>
              <Col md={4}>
                <div>
                  <Avatar icon={<UserOutlined />}></Avatar> Nguyễn Minh Hiếu
                </div>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout> */}
    </div>
  );
}

export default Dashboard;
