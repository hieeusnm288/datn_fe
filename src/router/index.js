import DashbordClient from "../components/dasbordclient/DashbordClient";
import Dashboard from "../components/dashboard/Dashboard";
import CartPage from "../pages/CartPage/CartPage";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import LoginKH from "../pages/Login/FormLogin/LoginKH";
import LoginPage from "../pages/Login/FormLogin/LoginPage";
import Register from "../pages/Login/RegisterForm/Register";
import AddPTTT from "../pages/PhuongThucTT/AddPTTT";
import ListPTTT from "../pages/PhuongThucTT/ListPTTT";
import AddOrEditBrand from "../pages/brand/AddOrEditBrand";
import ListBrand from "../pages/brand/ListBrand";
import AddDeGiay from "../pages/degiay/AddDeGiay";
import ListDeGiay from "../pages/degiay/ListDeGiay";
import DashboardPage from "../pages/home/DashboardPage";
import AddKhachHang from "../pages/khachhang/AddKhachHang";
import ListKhachHang from "../pages/khachhang/ListKhachHang";
import AddKM from "../pages/khuyenmai/AddKM";
import ListKM from "../pages/khuyenmai/ListKM";
import AddKichCo from "../pages/kichco/AddKichCo";
import ListKichCo from "../pages/kichco/ListKichCo";
import DetailOrder from "../pages/listIOrderClinet/DetailOrder";
import ListOrderClient from "../pages/listIOrderClinet/ListOrderClient";
import ListOrderAdmin from "../pages/listorderadmin/ListOrderAdmin";
import ListProductClient from "../pages/listproductclent/ListProductClient";
import AddMauSac from "../pages/mausac/AddMauSac";
import ListMauSac from "../pages/mausac/ListMauSac";
import ListNhanVien from "../pages/nhanvien/ListNhanVien";
import ThemNhanVien from "../pages/nhanvien/ThemNhanVien";
import PaymentSuccess from "../pages/paymentSucces/PaymentSuccess";
import AddDetailProduct from "../pages/product/AddDetailProduct";
import AddProduct from "../pages/product/AddProduct";
import ListProduct from "../pages/product/ListProduct";
import MyProfile from "../pages/profile/MyProfile";

const adminRouter = [
  { path: "/admin/dashboard", component: DashboardPage, layout: Dashboard },

  // Router Category
  {
    path: "/admin/list-nhanvien",
    component: ListNhanVien,
    layout: Dashboard,
  },
  {
    path: "/admin/nhanvien/add",
    component: ThemNhanVien,
    layout: Dashboard,
  },
  {
    path: "/admin/nhanvien/add/:id",
    component: ThemNhanVien,
    layout: Dashboard,
  },

  //Router Brand
  {
    path: "/admin/list-brands",
    component: ListBrand,
    layout: Dashboard,
  },
  {
    path: "/admin/brand/add",
    component: AddOrEditBrand,
    layout: Dashboard,
  },

  // Router Product
  {
    path: "/admin/list-products",
    component: ListProduct,
    layout: Dashboard,
  },
  {
    path: "/admin/product/add",
    component: AddProduct,
    layout: Dashboard,
  },
  {
    path: "/admin/product/add/:id",
    component: AddProduct,
    layout: Dashboard,
  },
  {
    path: "/admin/product/add-detail",
    component: AddDetailProduct,
    layout: Dashboard,
  },
  {
    path: "/admin/product/add-detail/:id",
    component: AddDetailProduct,
    layout: Dashboard,
  },
  {
    path: "/admin/invoice",
    component: ListOrderAdmin,
    layout: Dashboard,
  },
  {
    path: "/admin/khuyenmai/add",
    component: AddKM,
    layout: Dashboard,
  },
  {
    path: "/admin/khuyenmai/add/:id",
    component: AddKM,
    layout: Dashboard,
  },
  {
    path: "/admin/list-khuyenmai",
    component: ListKM,
    layout: Dashboard,
  },
  {
    path: "/admin/degiay/add",
    component: AddDeGiay,
    layout: Dashboard,
  },
  {
    path: "/admin/degiay/add/:id",
    component: AddDeGiay,
    layout: Dashboard,
  },
  {
    path: "/admin/list-degiay",
    component: ListDeGiay,
    layout: Dashboard,
  },
  {
    path: "/admin/kichco/add",
    component: AddKichCo,
    layout: Dashboard,
  },
  {
    path: "/admin/kichco/add/:id",
    component: AddKichCo,
    layout: Dashboard,
  },
  {
    path: "/admin/list-kichco",
    component: ListKichCo,
    layout: Dashboard,
  },
  {
    path: "/admin/mausac/add",
    component: AddMauSac,
    layout: Dashboard,
  },
  {
    path: "/admin/mausac/add/:id",
    component: AddMauSac,
    layout: Dashboard,
  },
  {
    path: "/admin/list-mausac",
    component: ListMauSac,
    layout: Dashboard,
  },
  {
    path: "/admin/pttt/add",
    component: AddPTTT,
    layout: Dashboard,
  },
  {
    path: "/admin/pttt/add/:id",
    component: AddPTTT,
    layout: Dashboard,
  },
  {
    path: "/admin/list-pttt",
    component: ListPTTT,
    layout: Dashboard,
  },
  {
    path: "/admin/khachhang/add",
    component: AddKhachHang,
    layout: Dashboard,
  },
  {
    path: "/admin/khachhang/add/:id",
    component: AddKhachHang,
    layout: Dashboard,
  },
  {
    path: "/admin/list-khachhang",
    component: ListKhachHang,
    layout: Dashboard,
  },
  //Tài Khoản
  // {
  //   path: "/user-account-management",
  //   component: TaiKhoan,
  //   layout: Dashboard,
  // },
];

const publicRouter = [
  { path: "/admin/login", component: LoginPage, layout: null },
  { path: "/login", component: LoginKH, layout: null },
  { path: "/register", component: Register, layout: null },
  {
    path: "/",
    component: ListProductClient,
    layout: DashbordClient,
  },
  {
    path: "/my-profile",
    component: MyProfile,
    layout: DashbordClient,
  },
  {
    path: "/payment-succes",
    component: PaymentSuccess,
    layout: DashbordClient,
  },
  {
    path: "/shop-product/:slug",
    component: ListProductClient,
    layout: DashbordClient,
  },
  {
    path: "/shop-product-detail/:id",
    component: DetailProduct,
    layout: DashbordClient,
  },
  {
    path: "/shop-product/cart-pge",
    component: CartPage,
    layout: DashbordClient,
  },
  {
    path: "/my-order",
    component: ListOrderClient,
    layout: DashbordClient,
  },
  {
    path: "/order-detail/:id",
    component: DetailOrder,
    layout: DashbordClient,
  },
];

export { adminRouter, publicRouter };
