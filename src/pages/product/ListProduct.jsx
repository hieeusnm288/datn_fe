import React, { useEffect, useState } from "react";
import withRouter from "../../helpers/withRouter";
import {
  Button,
  Space,
  Table,
  Select,
  Modal,
  Pagination,
  notification,
  Image,
  Input,
  Tag,
} from "antd";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getListProduct } from "../../redux/slice/productSlice";
import { useNavigate } from "react-router-dom";
import { getListCate } from "../../redux/slice/categorySlice";
import { getListBrand } from "../../redux/slice/brandSlice";

function ListProduct() {
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetail, setProductDetail] = useState();
  const dispatch = useDispatch();
  const [nameSreach, setNameSearch] = useState("");
  const { ListProduct, totalElements } = useSelector((state) => state.product);
  const { listCategory } = useSelector((state) => state.category);
  const { listBrand } = useSelector((state) => state.brand);
  const [search, setSearch] = useState({
    name: "",
    categoryId: "",
    brandId: "",
    page: 0,
  });
  useEffect(() => {
    dispatch(getListProduct(search));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(getListCate(0));
    dispatch(
      getListBrand({
        query: "",
        page: 0,
      })
    );
  }, [dispatch]);

  const navigate = useNavigate();
  const showModal = (product) => {
    setIsModalOpen(true);
    setProductDetail(product);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deleteProduct(productDetail?.id)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        dispatch(
          getListProduct({
            name: "",
            categoryId: "",
            brandId: "",
            page: 0,
          })
        );
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (product) => {
    navigate(`/admin/product/add/${product.id}`);
  };

  const conChangePage = (page) => {
    dispatch(
      getListProduct({
        name: search.name,
        categoryId: search.categoryId,
        brandId: search.brandId,
        page: page - 1,
      })
    );
  };

  const handleRowClick = (record) => {};

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 500,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 300,
      render: (val, record, index) => (
        <>{record.price.toLocaleString("vi-VN")}</>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 300,
      render: (val, record, index) => <>{record.category.name}</>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 300,
      render: (val, record, index) => <>{record.brand.name}</>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Image
          src={`https://springbe-production.up.railway.app/api/v1/product/image/${record.image}`}
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
        <Tag color={record.status === 1 ? "green" : "red"} key={record.status}>
          {record.status === 1 ? "Visible" : "Invisible"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleEdit(record)}
            type="primary"
            icon={<MdModeEditOutline />}
          >
            Edit
          </Button>
          <Button
            onClick={() => showModal(record)}
            type="primary"
            danger="true"
            icon={<MdDelete />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const onSearch = () => {
    setSearch({
      name: nameSreach,
      categoryId: search.categoryId,
      brandId: search.brandId,
      page: 0,
    });
    dispatch(
      getListProduct({
        name: nameSreach,
        categoryId: search.categoryId,
        brandId: search.brandId,
        page: 0,
      })
    );
  };
  const onChangName = (e) => {
    setNameSearch(e.target.value);
  };

  const onChangBrand = (value) => {
    setSearch({
      name: search.name,
      categoryId: search.categoryId === 0 ? "" : search.categoryId,
      brandId: value === 0 ? "" : value,
      page: 0,
    });
  };

  const onChangCate = (value) => {
    setSearch({
      name: search.name,
      categoryId: value === 0 ? "" : value,
      brandId: search.brandId === 0 ? "" : search.brandId,
      page: 0,
    });
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col-6">
          <div className="row">
            <label className="form-label">Srearch Product By Nam</label>
            <div className="col-8">
              <Input onChange={onChangName} />
            </div>
            <div className="col-4">
              <Button onClick={onSearch}>Search</Button>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <label className="form-label">Filter by Category</label>
              <br />
              <Select
                placeholder="Select a Category"
                onChange={onChangCate}
                style={{ width: "100%" }}
                allowClear
              >
                <Option value={0}>All</Option>
                {listCategory?.map((i) => (
                  <Option value={i.id}>{i.name}</Option>
                ))}
              </Select>
            </div>
            <div className="col-6">
              <label className="form-label">Filter by Brand</label>
              <br />
              <Select
                placeholder="Select a Brand"
                onChange={onChangBrand}
                // className="form-select"
                style={{ width: "100%" }}
                allowClear
              >
                <Option value={0}>All</Option>
                {listBrand?.map((i) => (
                  <Option value={i.id}>{i.name}</Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
      <p>List Product</p>
      <Table
        columns={columns}
        dataSource={ListProduct}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        style={{ cursor: "pointer" }}
      />
      <Pagination
        total={totalElements}
        onChange={conChangePage}
        style={{ float: "right", marginTop: "20px" }}
      />
      <Modal
        title="Delete Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Bạn có muốn xóa Sản phẩm: {productDetail ? productDetail.name : ""}
        </p>
      </Modal>
    </div>
  );
}

export default withRouter(ListProduct);
