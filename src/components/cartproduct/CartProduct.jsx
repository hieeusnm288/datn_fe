import React, { useEffect, useState } from "react";
import "./CartProduct.scss";
import { DeleteOutlined } from "@ant-design/icons";
function CartProduct({ product }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, [cartItems]);

  const deleteProct = (id) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };

  return (
    <div className="cart-product">
      <div className="card m-2">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="img-product col-2">
              <img
                src={`https://springbe-production.up.railway.app/api/v1/product/image/${product.image}`}
              />
            </div>
            <div className="name-product col-4">{product.name}</div>
            <div className="count-product col-1">{product.quantity}</div>
            <div className="price-product col-2">
              {product.price.toLocaleString("vi-VN")}
            </div>
            <div className="price-product col-2">
              {(product.price * product.quantity).toLocaleString("vi-VN")}
            </div>
            <div className="delete-product col-1">
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => deleteProct(product.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
