import React, { useEffect, useState } from "react";
import "./ListShop.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListSanPham } from "../../redux/slice/sanphamSlice";
import CradProduct from "../../components/crads/CradProduct";
import { Button, Input, Pagination, Space } from "antd";
function ListProductClient() {
  const { slug } = useParams();
  const [search, setSearch] = useState();
  const { listSanPham } = useSelector((state) => state.sanpham);
  const dispatch = useDispatch();
  const params = new URLSearchParams(slug);
  const obj = Object.fromEntries(params);
  const [totalElements, setTotalElements] = useState(0);
  useEffect(() => {
    if (!slug || !obj?.brandId) {
      dispatch(
        getListSanPham({
          name: "",
          status: 2,
          thuongHieu: "",
          page: 0,
        })
      ).then((res) => {
        if (res?.payload?.result) {
          setTotalElements(res?.payload?.result.page.totalElements);
        }
      });
    } else {
      dispatch(
        getListSanPham({
          name: "",
          thuongHieu: obj?.brandId,
          status: 2,
          page: 0,
        })
      ).then((res) => {
        if (res?.payload?.result) {
          setTotalElements(res?.payload?.result.page.totalElements);
        }
      });
    }
  }, [dispatch, slug, obj?.brandId]);
  const conChangePage = (page) => {
    dispatch(
      getListSanPham({
        name: "",
        status: 2,
        thuongHieu: "",
        page: page - 1,
      })
    );
  };
  const conChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = () => {
    dispatch(
      getListSanPham({
        name: search,
        status: 2,
        thuongHieu: "",
        page: 0,
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
        {listSanPham
          ?.filter((i) => i.trangthai === 1)
          .map((i) => (
            <div className="col-4 mb-3 hover" key={i.id}>
              <CradProduct product={i} />
            </div>
          ))}
      </div>
      <Pagination
        onChange={conChangePage}
        className="mt-3"
        defaultCurrent={1}
        total={totalElements}
        size={8}
        style={{ float: "right" }}
      />
    </div>
  );
}

export default ListProductClient;
