import React, { useEffect, useState } from "react";
import logo from "../../image/logo.png";
import "./Dashboradcline.scss";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { getListBrand } from "../../redux/slice/brandSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, Popover } from "antd";
import { jwtDecode } from "jwt-decode";
function DashbordClient({ children }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  // const { listCategory } = useSelector((state) => state.category);
  const { listBrand, totalElements } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getListBrand());
  }, [dispatch]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setListCart(JSON.parse(localStorage.getItem("cartItems")));
  // }, [listCart]);
  const [tenKhachHang, setTenKhachHang] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      if (userData) {
        console.log(userData);
        setUsername(userData.sub + "");
        setTenKhachHang(userData.tenKhachHang);
        localStorage.setItem("username", JSON.stringify(userData.sub + ""));
        localStorage.setItem("role", JSON.stringify("khachhang"));
      }
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const contentAccount = (
    <>
      {username ? (
        <div>
          <p>{tenKhachHang}</p>
          <p
            onClick={() => navigate("/my-order")}
            style={{ cursor: "pointer" }}
          >
            Đơn hàng của tôi
          </p>
          <p onClick={logout} style={{ cursor: "pointer" }}>
            Đăng xuất
          </p>
        </div>
      ) : (
        <p onClick={() => navigate("/login")}>Đăng nhập</p>
      )}
    </>
  );
  return (
    <div className="dashborad-client">
      <div className="main">
        <div className="header">
          <img src={logo} alt="" />
          <div className="menu-header">
            <p>Home</p>
            <p>Shop</p>
            <p>About Us</p>
            <p>Contact Us</p>
          </div>
          <div className="icons">
            {/* <Badge count={listCart?.length}>
              <ShoppingCartOutlined
                onClick={() => navigate("/shop-product/cart-pge")}
                style={{ fontSize: "25px" }}
              />
            </Badge> */}
            <Popover
              content={contentAccount}
              // title=""
              trigger="click"
              placement="bottomLeft"
            >
              <UserOutlined />
            </Popover>
          </div>
        </div>
        {/* Slider */}
        <div className="bannerProducts"></div>
        <div className="shop-main">
          <div className="shop-content row container">
            <div className="shop-sidebar col-2">
              <div className="sidebar-content">
                <h2>Brand</h2>
                <p
                  className="category-name"
                  onClick={() => navigate(`/shop-product/name=&brandId=`)}
                >
                  All
                </p>
                {listBrand?.map((i) => (
                  <p
                    className="category-name"
                    onClick={() =>
                      navigate(`/shop-product/name=&brandId=${i.idThuongHieu}`)
                    }
                  >
                    {i.tenthuonghieu}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashbordClient;
