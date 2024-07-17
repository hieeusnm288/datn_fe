import React, { useEffect, useState } from "react";
import { getListSanPham } from "../../redux/slice/sanphamSlice";
import { Button, Space, Table, Modal, Tag, notification, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
import ModalEditSanPham from "./ModalEditSanPham";

function ListProduct() {
  const { listSanPham, totalElements } = useSelector((state) => state.sanpham);
  const [sanPhamDeatil, setSanPhamDetail] = useState();
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [search, setSearch] = useState({
    name: "",
    status: 2,
    thuongHieu: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListSanPham(search));
  }, [dispatch, search]);

  const openModalUpdate = (record) => {
    setSanPhamDetail(record);
    setShowModalUpdate(true);
  };
  const cancelModalUpdate = () => {
    setSanPhamDetail(null);
    setShowModalUpdate(false);
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
          color={record.trangthai == 1 ? "green" : "red"}
          key={record.status}
        >
          {record.trangthai == 1 ? "Visible" : "Invisible"}
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
        </Space>
      ),
    },
  ];
  return (
    <>
      <p>List Product</p>
      <Table columns={columns} dataSource={listSanPham} pagination={false} />
      <ModalEditSanPham
        visible={showModalUpdate}
        onCancel={cancelModalUpdate}
        data={sanPhamDeatil}
      />
    </>
  );
}

export default ListProduct;
