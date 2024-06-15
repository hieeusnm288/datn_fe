import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProduct } from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "./DetailProduct.scss";
function DetailProduct() {
  const { detailProduct } = useSelector((state) => state.product);
  const [detail, setDetail] = useState();
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailProduct(id)).then((res) => {
      setDetail(res.payload);
    });
  }, [id, dispatch]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const productExist = prevCartItems.find((item) => item.id === product.id);
      if (productExist) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <div className="detail-product">
      <div className="name-product">
        <p>{detail?.name}</p>
      </div>
      <div className="row justify-content-between">
        <div className="col-6">
          <div
            className="card"
            style={{
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <img
              src={`https://springbe-production.up.railway.app/api/v1/product/image/${detail?.image}`}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="price-product">
            <p>{detail?.price.toLocaleString("vi-VN")} VND</p>
          </div>
          <div className="desc">
            <div
              className="card"
              style={{
                boxShadow:
                  "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
                border: "none",
              }}
            >
              <div className="card-body">
                <p className="desc">Specifications Product</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: detail?.specifications,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="km">
            <div className="card">
              <p className="desc">Special promotion</p>
              <ul className="lists">
                <li className="list">
                  <span>Free Shipping</span>
                </li>
                <li className="list">
                  <span>Installment 0 %</span>
                </li>
                <li className="list">
                  <span>1 Switch 1 for 1 month</span>
                </li>
              </ul>
              <button
                type="button"
                className="action"
                onClick={() => addToCart(detail)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-between mt-5 ">
        <div className="col-12">
          <div
            className="card"
            style={{
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              border: "none",
            }}
          >
            <div className="card-body content">
              <h5 className="card-title fw-semibold mb-4">
                Description Product
              </h5>
              <div
                className="content-2"
                dangerouslySetInnerHTML={{
                  __html: detail?.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
