import React, { useEffect, useState } from "react";
import "./ListShop.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListSanPham } from "../../redux/slice/sanphamSlice";
import CradProduct from "../../components/crads/CradProduct";
import { Button, Input, Space } from "antd";
function ListProductClient() {
  const { slug } = useParams();
  const [search, setSearch] = useState();
  const { listSanPham } = useSelector((state) => state.sanpham);
  const dispatch = useDispatch();
  const params = new URLSearchParams(slug);
  const obj = Object.fromEntries(params);

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

  const conChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    dispatch(
      getListSanPham({
        name: search,
        status: 2,
        thuongHieu: "",
      })
    );
  };

  return (
    <div>
      <div className="mb-5">
        <label className="mb-1">Tìm kiếm sản phẩm</label>
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Input placeholder="Nhập tên sản phẩm" onChange={conChange} />
          <Button type="primary" onClick={onSearch}>
            Tìm Kiếm
          </Button>
        </Space.Compact>
      </div>
      <div className="row">
        {listSanPham?.map((i) => (
          <div className="col-4 mb-3 hover">
            <CradProduct product={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListProductClient;
