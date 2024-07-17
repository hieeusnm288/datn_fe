import React, { useEffect, useState } from "react";
import "./CradProduct.scss";
import { EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CradProduct({ product, onClick }) {
  const navigate = useNavigate();
  console.log(product);
  return (
    <div className="card-product">
      <div className="card">
        <div
          className="card-img"
          onClick={() => navigate(`/shop-product-detail/${product.idSanPham}`)}
        >
          <img
            src={`http://localhost:8080/api/v1/thuonghieu/logo/${product.tenhinhanh}`}
          />
        </div>
        <div className="card-info">
          <div>
            <p className="text-title">{product.tensanpham}</p>
          </div>
          <div>
            <div className="content-2 mb-1">
              Thương Hiệu: <b>{product.thuonghieu?.tenthuonghieu}</b>
            </div>
            <div className="content-2 mb-3">{product.mota}</div>
          </div>
        </div>
        <div className="card-footer">
          <span className="text-price">
            {product.dongia.toLocaleString("vi-VN")} VND
          </span>
          <div className="card-button" onClick={onClick}>
            <EyeOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CradProduct;
