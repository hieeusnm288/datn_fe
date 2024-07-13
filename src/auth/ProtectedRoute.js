// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  layout: Layout,
  isAllowed,
  ...rest
}) => {
  return isAllowed ? (
    <Layout>
      <Component {...rest} />
    </Layout>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

export default ProtectedRoute;
