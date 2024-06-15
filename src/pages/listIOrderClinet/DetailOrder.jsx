import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailOrder } from "../../redux/slice/orderSlice";
import ProductOrder from "../../components/productorder/ProductOrder";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

function DetailOrder() {
  const [detailOrder, setDetailOrder] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getDetailOrder(id)).then((res) => {
        setDetailOrder(res.payload);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    let total = 0;
    detailOrder?.forEach((item) => {
      total += item.product.price * item.product.quantity;
    });
    setTotalPrice(total);
  }, [detailOrder]);

  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="text"
        icon={<LeftCircleOutlined />}
        onClick={() => navigate("/my-order")}
      >
        Quay lại danh sách đơn hàng
      </Button>
      <div
        className="card mt-3"
        style={{
          border: "none",
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        }}
      >
        <div className="card-body">
          <div className="row justify-content-between">
            <div className="col-10">
              <h5 className="card-title fw-semibold mb-4">Chi tiết đơn hàng</h5>
            </div>
          </div>
          <div>
            {detailOrder?.map((i) => (
              <ProductOrder product={i?.product} />
            ))}
          </div>
          <div className="row justify-content-between mt-3">
            <div className="col-10">
              <h5 className="card-title fw-semibold mb-4">Total payment</h5>
            </div>
            <div className="col-2">
              <p className="fw-bold">
                {totalPrice.toLocaleString("vi-VN")} VND
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
