import React, { useEffect, useState } from "react";
import "./ListShop.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListSanPham } from "../../redux/slice/sanphamSlice";
import CradProduct from "../../components/crads/CradProduct";

function ListProductClient() {
  const { slug } = useParams();

  const { listSanPham } = useSelector((state) => state.sanpham);
  const dispatch = useDispatch();
  const params = new URLSearchParams(slug);
  const obj = Object.fromEntries(params);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

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

  useEffect(() => {
    if (!slug || !obj?.brandId) {
      dispatch(
        getListSanPham({
          name: "",
          status: 2,
          thuongHieu: "",
        })
      );
    } else {
      dispatch(
        getListSanPham({
          name: "",
          thuongHieu: obj?.brandId,
          status: 2,
        })
      );
    }
  }, [dispatch, slug, obj?.brandId]);
  console.log(obj?.brandId);
  return (
    <div className="row">
      {listSanPham?.map((i) => (
        <div className="col-4 mb-3">
          <CradProduct product={i} onClick={() => addToCart(i)} />
        </div>
      ))}
    </div>
  );
}

export default ListProductClient;
