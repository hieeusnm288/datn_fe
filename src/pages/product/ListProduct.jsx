import React, { useEffect, useState } from "react";
import { getListSanPham } from "../../redux/slice/sanphamSlice";
import {
  Button,
  Space,
  Table,
  Modal,
  Tag,
  notification,
  Image,
  Pagination,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
import ModalEditSanPham from "./ModalEditSanPham";
import { EyeOutlined } from "@ant-design/icons";
import ModalChiTietSP from "./ModalChiTietSP";

function ListProduct() {
  const { listSanPham } = useSelector((state) => state.sanpham);
  const [sanPhamDeatil, setSanPhamDetail] = useState();
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [listProduct, setListProduct] = useState();
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState({
    name: "",
    status: 2,
    thuongHieu: "",
    page: 0,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListSanPham(search)).then((res) => {
      if (res?.payload?.result) {
        setListProduct(res?.payload?.result.content);
        setTotalElements(res?.payload?.result.page.totalElements);
        setTotalPages(res?.payload?.result.page.totalPages);
      }
    });
  }, [dispatch, search]);

  const conChangePage = (page) => {
    setSearch({
      name: "",
      status: 2,
      thuongHieu: "",
      page: page - 1,
    });
  };

  const openModalUpdate = (record) => {
    setSanPhamDetail(record);
    setShowModalUpdate(true);
  };
  const openModalDetail = (record) => {
    setSanPhamDetail(record);
    setShowModalDetail(true);
  };
  const cancelModalDetail = () => {
    setSanPhamDetail(null);
    setShowModalDetail(false);
  };
  const cancelModalUpdate = () => {
    setSanPhamDetail(null);
    setShowModalUpdate(false);
    dispatch(getListSanPham(search)).then((res) => {
      if (res?.payload?.result) {
        setListProduct(res?.payload?.result.content);
        setTotalElements(res?.payload?.result.page.totalElements);
        setTotalPages(res?.payload?.result.page.totalPages);
      }
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "idSanPham",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tensanpham",
      key: "name",
      width: 500,
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
      width: 500,
    },
    {
      title: "Hình ảnh",
      dataIndex: "logo",
      key: "logo",
      render: (_, record) => (
        <Image
          src={`http://localhost:8080/api/v1/thuonghieu/logo/${record.tenhinhanh}`}
          width={50}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 300,
      render: (_, record) => (
        <Tag
          color={record.trangthai === 1 ? "green" : "red"}
          key={record.status}
        >
          {record.trangthai === 1 ? "Visible" : "Invisible"}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => openModalUpdate(record)}
            type="primary"
            icon={<MdModeEditOutline />}
          >
            Edit
          </Button>
          <Button
            onClick={() => openModalDetail(record)}
            icon={<EyeOutlined />}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <p>List Product</p>
      <Table columns={columns} dataSource={listProduct} pagination={false} />
      <Pagination
        onChange={conChangePage}
        className="mt-3"
        defaultCurrent={1}
        total={totalElements}
        size={8}
        style={{ float: "right" }}
      />
      <ModalEditSanPham
        visible={showModalUpdate}
        onCancel={cancelModalUpdate}
        data={sanPhamDeatil}
      />
      <ModalChiTietSP
        visible={showModalDetail}
        onCancel={cancelModalDetail}
        data={sanPhamDeatil}
      />
    </>
  );
}

export default ListProduct;
