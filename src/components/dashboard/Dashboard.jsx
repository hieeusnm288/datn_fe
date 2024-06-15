import React from "react";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { TbBrandShopee } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { Menu, Avatar, Popover } from "antd";
import { BiLogoShopify, BiCategoryAlt } from "react-icons/bi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo.svg";

// const { Header, Sider, Content } = Layout;
function Dashboard({ children }) {
  // const [collapsed, setCollapsed] = useState(false);

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
    navigate("/login");
  };
  const contentAccount = (
    <div>
      <p>My Profile</p>
      <p>Đổi mật khẩu</p>
      <p onClick={logout} style={{ cursor: "pointer" }}>
        Đăng xuất
      </p>
    </div>
  );

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
                      onClick: () => navigate("/admin/product/add"),
                    },
                    {
                      key: "7",
                      icon: <FaRegListAlt />,
                      label: "List Products",
                      onClick: () => navigate("/admin/list-products"),
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
                      onClick: () => navigate("/admin/brand/add"),
                    },
                    {
                      key: "10",
                      icon: <FaRegListAlt />,
                      label: "List Brands",
                      onClick: () => navigate("/admin/list-brands"),
                    },
                  ],
                },
                {
                  key: "11",
                  icon: <LiaFileInvoiceDollarSolid />,
                  label: "Invoice",
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
