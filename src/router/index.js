import DashbordClient from "../components/dasbordclient/DashbordClient";
import Dashboard from "../components/dashboard/Dashboard";
import CartPage from "../pages/CartPage/CartPage";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import LoginPage from "../pages/Login/FormLogin/LoginPage";
import Register from "../pages/Login/RegisterForm/Register";
import AddOrEditBrand from "../pages/brand/AddOrEditBrand";
import ListBrand from "../pages/brand/ListBrand";
import AddOrEdit from "../pages/category/AddOrEdit";
import ListCatagories from "../pages/category/ListCatagories";
import DashboardPage from "../pages/home/DashboardPage";
import DetailOrder from "../pages/listIOrderClinet/DetailOrder";
import ListOrderClient from "../pages/listIOrderClinet/ListOrderClient";
import ListOrderAdmin from "../pages/listorderadmin/ListOrderAdmin";
import ListProductClient from "../pages/listproductclent/ListProductClient";
import AddProduct from "../pages/product/AddProduct";
import ListProduct from "../pages/product/ListProduct";

const adminRouter = [
  { path: "/admin/dashboard", component: DashboardPage, layout: Dashboard },

  // Router Category
  {
    path: "/admin/list-category",
    component: ListCatagories,
    layout: Dashboard,
  },
  {
    path: "/admin/category/add",
    component: AddOrEdit,
    layout: Dashboard,
  },
  {
    path: "/admin/category/add/:id",
    component: AddOrEdit,
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
    path: "/admin/invoice",
    component: ListOrderAdmin,
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
  { path: "/login", component: LoginPage, layout: null },
  { path: "/register", component: Register, layout: null },
  {
    path: "/",
    component: ListProductClient,
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
