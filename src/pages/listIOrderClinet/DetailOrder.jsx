import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { getDetailOrder } from "../../redux/slice/orderSlice";
import { getListDonHangCT } from "../../redux/slice/donhangchitietSlice";
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
      dispatch(getListDonHangCT(id)).then((res) => {
        setDetailOrder(res.payload.result);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    let total = 0;
    detailOrder?.forEach((item) => {
      total += item.chiTietSanPham?.dongia * item?.soluong;
    });
    setTotalPrice(total);
  }, [detailOrder]);

  const navigate = useNavigate();

  console.log(detailOrder);

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
              <ProductOrder product={i} />
            ))}
          </div>
          <div className="d-flex justify-content-between mt-5">
            <div>
              <h5 className="card-title fw-semibold mb-4">
                Tổng Tiền Đơn Hàng
              </h5>
            </div>
            <div>
              <p className="fw-bold" style={{ fontSize: "18px" }}>
                {totalPrice?.toLocaleString("vi-VN")} VND
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="card-title fw-semibold mb-4">Khuyễn Mại(%)</h5>
            </div>
            <div>
              <p className="fw-bold" style={{ fontSize: "18px" }}>
                {detailOrder && detailOrder[0]?.hoaDon?.khuyenMai
                  ? `${detailOrder[0]?.hoaDon.khuyenMai.phamtramgiam}%`
                  : "0"}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <h5 className="card-title fw-semibold mb-4">Thành Tiền</h5>
            </div>
            <div>
              <p className="fw-bold">
                {detailOrder &&
                  detailOrder[0]?.hoaDon.tongtien.toLocaleString("vi-VN")}{" "}
                VND
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
