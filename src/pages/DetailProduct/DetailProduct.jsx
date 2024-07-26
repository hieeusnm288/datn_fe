import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSanPham } from "../../redux/slice/sanphamSlice";
import {
  getListCTSanPham,
  getCTSP,
} from "../../redux/slice/chitietsanphamSlice";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import { getKichCoByName } from "../../redux/slice/kichcoSlice";
import { getMauSacByName } from "../../redux/slice/mausacSlice";
import {
  getListGioCT,
  insertGioHangCT,
} from "../../redux/slice/chitietgiohangSlice";
import { notification, Radio } from "antd";
import "./DetailProduct.scss";
import { jwtDecode } from "jwt-decode";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
function DetailProduct() {
  const navigate = useNavigate();
  const [listCTSanPham, setListCTSanPham] = useState([]);
  const [detail, setDetail] = useState();
  const [mauSac, setMauSac] = useState();
  const [kichCo, setKichCo] = useState();
  const [cstpDetail, setCtspDetail] = useState();
  const [trangThai, setTrangThai] = useState();
  const [value, setValue] = useState(1);
  const [count, setCount] = useState();
  const [valueSize, setValueSize] = useState(1);
  const [username, setUsername] = useState();
  const [quantity, setQuantity] = useState(1);
  const onChange1 = (e) => {
    setValue(e.target.value);
    dispatch(getKichCoByName(e.target.value)).then((res) => {
      setKichCo(res.payload?.result);
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      if (userData) {
        setUsername(userData.sub + "");
      }
    }
  }, []);
  const onChange2 = (e) => {
    setValueSize(e.target.value);
    dispatch(getMauSacByName(e.target.value)).then((res) => {
      setMauSac(res.payload?.result);
    });
  };

  const upQuantity = () => {
    setQuantity(quantity + 1);
  };

  const downQuantity = () => {
    setQuantity(quantity - 1);
  };

  const [price, setPrice] = useState();
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getSanPham(id)).then((res) => {
        setDetail(res.payload?.result);
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && mauSac && kichCo) {
      dispatch(
        getCTSP({
          idSanPham: id,
          idKichThuoc: kichCo?.idKichCo,
          idMauSac: mauSac?.idMauSac,
        })
      ).then((res) => {
        setCtspDetail(res.payload?.result);
        setPrice(res.payload?.result?.dongia);
        setCount(res.payload?.result?.soluongton);
        setTrangThai(res.payload?.result.trangthai);
      });
    }
  }, [id, dispatch, mauSac, kichCo]);

  useEffect(() => {
    if (detail) {
      dispatch(getListCTSanPham(detail.idSanPham)).then((res) => {
        setListCTSanPham(res.payload?.result);
        setPrice(res.payload?.result[0].dongia);
      });
    }
  }, [detail, dispatch]);
  // console.log("ctsp", cstpDetail);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const uniqueColors = [
    ...new Set(listCTSanPham.map((product) => product.mausac.tenmausac)),
  ];
  const uniqueSize = [
    ...new Set(listCTSanPham.map((product) => product.kichco.tenkichco)),
  ];
  const addToCart = (cstp) => {
    if (!username) {
      notification.open({
        message: "Bạn chưa đăng nhập!",
        description: "Vui lòng đăng nhập để đặt hàng",
        type: "warning",
      });
      navigate("/login");
    } else {
      dispatch(
        insertGioHangCT({
          idGioHang: localStorage.getItem("idGioHang").slice(1, -1),
          idChiTietSanPham: cstp.idChiTietSanPham,
          soluong: quantity,
        })
      ).then((res) => {
        if (res?.payload?.result) {
          notification.open({
            message: "Thành công!",
            description: "Thêm sản phẩm vào giỏ hàng",
            type: "success",
          });
          dispatch(
            getListGioCT(localStorage.getItem("idGioHang").slice(1, -1))
          );
        } else {
          notification.open({
            message: "Không thể thêm vào giỏ hàng",
            description:
              "Số lượng sản phẩm không đủ hoặc bạn đã thêm quá 10 sản phẩm",
            type: "error",
          });
        }
      });
    }
  };

  return (
    <div className="detail-product">
      <div className="name-product">
        <span>{detail?.tensanpham}</span>
        <span style={{ color: "red" }}>
          {trangThai === 0 ? "(Sản phẩm đã ngừng bán)" : ""}
        </span>
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
            <Slider {...settings}>
              {listCTSanPham?.map((i) => (
                <img
                  src={`http://localhost:8080/api/v1/thuonghieu/logo/${i.tenhinhanh}`}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="col-5">
          <div className="price-product">
            <p>{price?.toLocaleString("vi-VN")} VND</p>
          </div>
          <p>
            Số lượng:{" "}
            {count == 0 ? <b style={{ color: "red" }}>Hết Hàng</b> : count}
          </p>
          <div className="km">
            <div className="card">
              <p className="desc">Kích Cỡ và Màu Sắc</p>
              <ul className="lists">
                <li>
                  <p>Kích Cỡ</p>
                  <Radio.Group onChange={onChange1} value={value}>
                    {uniqueSize?.map((i) => (
                      <Radio value={i}>{i}</Radio>
                    ))}
                  </Radio.Group>
                </li>
                <li className="mt-3">
                  <p>Màu Sắc</p>
                  <Radio.Group onChange={onChange2} value={valueSize}>
                    {uniqueColors?.map((i) => (
                      <Radio value={i}>{i}</Radio>
                    ))}
                  </Radio.Group>
                </li>
                <li className="mt-3">
                  <p>Số Lượng</p>
                  <div className="d-flex">
                    <button
                      className="btn-quantity"
                      onClick={downQuantity}
                      disabled={quantity <= 1 || !cstpDetail ? true : false}
                    >
                      <MinusOutlined />
                    </button>
                    <div className="quantity">{quantity}</div>
                    <button
                      className="btn-quantity"
                      disabled={
                        quantity >= 10 || !cstpDetail || quantity >= count
                          ? true
                          : false
                      }
                      onClick={upQuantity}
                    >
                      <PlusOutlined />
                    </button>
                  </div>
                </li>
              </ul>

              <button
                type="button"
                className="action"
                onClick={() => addToCart(cstpDetail)}
                disabled={
                  count == 0 || !cstpDetail || trangThai === 0 ? true : false
                }
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
              <div>{detail?.mota}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
