import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";
// import LoginPage from "./pages/Login/FormLogin/LoginPage";
// import Register from "./pages/Login/RegisterForm/Register";
// import AddOrEdit from "./pages/category/AddOrEdit";
// import ListCatagories from "./pages/category/ListCatagories";
// import ListBrand from "./pages/brand/ListBrand";
// import AddOrEditBrand from "./pages/brand/AddOrEditBrand";
import { adminRouter, publicRouter } from "./router";
import Dashboard from "./components/dashboard/Dashboard";
import React, { Fragment, useEffect, useState } from "react";
import DashbordClient from "./components/dasbordclient/DashbordClient";
import { isLoggedIn, isAdmin } from "./auth/auth";
import ProtectedRoute from "./auth/ProtectedRoute";
import Page404 from "./pages/404page/Page404";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {adminRouter?.map((route, index) => {
              let Layout = Dashboard;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute
                      component={Page}
                      layout={Layout}
                      isAllowed={isLoggedIn() && isAdmin()}
                    />
                  }
                />
              );
            })}

            {publicRouter?.map((route, index) => {
              let Layout = DashbordClient;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
