import React, { useEffect, useState } from "react";
import "./CradProduct.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CradProduct({ product, onClick }) {
  const navigate = useNavigate();
  return (
    <div className="card-product">
      <div className="card">
        <div
          className="card-img"
          onClick={() => navigate(`/shop-product-detail/${product.id}`)}
        >
          <img
            src={`https://springbe-production.up.railway.app/api/v1/product/image/${product.image}`}
          />
        </div>
        <div className="card-info">
          <div>
            <p className="text-title">{product.name}</p>
          </div>
          <div>
            <div
              className="content-2"
              dangerouslySetInnerHTML={{
                __html: product?.description,
              }}
            ></div>
          </div>
        </div>
        <div className="card-footer">
          <span className="text-price">
            {product.price.toLocaleString("vi-VN")}
          </span>
          <div className="card-button" onClick={onClick}>
            <ShoppingCartOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CradProduct;
