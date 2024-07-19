import React, { useEffect, useState } from "react";
import withRouter from "../../helpers/withRouter";
import {
  Button,
  Space,
  Table,
  Modal,
  Pagination,
  notification,
  Image,
  Form,
  Input,
  Row,
  Col,
  Upload,
  Tag,
  Select,
} from "antd";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getListBrand,
  updateBrand,
} from "../../redux/slice/brandSlice";

import { PlusOutlined } from "@ant-design/icons";

function ListBrand() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [brandDetail, setBrandDetail] = useState();
  const dispatch = useDispatch();
  const { listBrand, totalElements } = useSelector((state) => state.brand);
  const { Option } = Select;
  const [key, setKey] = useState({
    query: "",
    page: 0,
  });
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getListBrand());
  }, [dispatch, form]);

  const showModal = (brand) => {
    setIsModalOpen(true);
    setBrandDetail(brand);
  };
  const [nameSreach, setNameSearch] = useState("");
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(deleteBrand(brandDetail?.idThuongHieu)).then((res) => {
      if (res.payload) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        setKey({
          query: "",
          page: 0,
        });
        dispatch(getListBrand());
      }
    });
  };
  const handleOkUpdate = () => {
    setIsModalUpdateOpen(false);
    form.validateFields().then((values) => {
      dispatch(
        updateBrand({
          idThuongHieu: values.idThuongHieu,
          tenthuonghieu: values.tenthuonghieu,
          mota: values.mota,
          trangthai: values.trangthai,
          logoFile: values.logoFile,
        })
      ).then((res) => {
        if (res.payload) {
          notification.open({
            message: "Thành công!",
            description: "Dữ liệu đã được cập nhật",
            type: "success",
          });
          // setBrandDetail(null);
          dispatch(getListBrand());
        }
      });
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  const handleEdit = (brand) => {
    setIsModalUpdateOpen(true);
    form.setFieldsValue({
      idThuongHieu: brand.idThuongHieu,
      tenthuonghieu: brand.tenthuonghieu.trimEnd(),
      mota: brand.mota,
      trangthai: brand.trangthai,
      logoFile: [
        {
          url: brand
            ? `http://localhost:8080/api/v1/thuonghieu/logo/${brand.hinhanh}`
            : "",
        },
      ],
    });
    // setBrandDetail(brand);
  };

  const conChangePage = (page) => {
    dispatch(
      getListBrand({
        query: key.query,
        page: page - 1,
      })
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (val, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên Thương Hiệu",
      dataIndex: "tenthuonghieu",
      key: "name",
      width: 900,
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "name",
      width: 500,
    },
    {
      title: "Trạng Thái",
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
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (_, record) => (
        <Image
          src={`http://localhost:8080/api/v1/thuonghieu/logo/${record.hinhanh}`}
          width={50}
        />
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[1]];
    }
    return e && e.fileList;
  };
  const onChangName = (e) => {
    setNameSearch(e.target.value);
  };
  const onSearch = () => {
    dispatch(
      getListBrand({
        query: nameSreach,
        page: 0,
      })
    );
  };
  return (
    <div>
      <label className="mb-1">Tìm kiếm Brand: </label>
      <Row gutter={16} className="mb-5">
        <Col span={22}>
          <Input onChange={onChangName} />
        </Col>
        <Col>
          <Button onClick={onSearch}>Search</Button>
        </Col>
      </Row>
      <h2>Danh Sách Thương Hiệu</h2>
      <Table columns={columns} dataSource={listBrand} pagination={false} />
      <Pagination
        total={totalElements}
        onChange={conChangePage}
        style={{ float: "right", marginTop: "20px" }}
        pageSize={10}
      />
      <Modal
        title="Delete Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Bạn có muốn xóa Brand: {brandDetail ? brandDetail.tenthuonghieu : ""}
        </p>
      </Modal>
      <Modal
        title="Update"
        open={isModalUpdateOpen}
        onOk={handleOkUpdate}
        onCancel={handleCancelUpdate}
      >
        <Form
          form={form}
          name="control-hooks"
          // onFinish={onFinish}
          style={{
            maxWidth: 800,
            marginTop: "20px",
          }}
        >
          <Form.Item
            name="idThuongHieu"
            label="Brand Id"
            // initialValue={brandDetail ? brandDetail.id : ""}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="tenthuonghieu"
            label="Tên Thương Hiệu"
            // initialValue={brandDetail ? brandDetail.name : ""}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mota"
            label="Mô tả"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="trangthai"
            label="Trạng Thái"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Chọn Trạng Thái">
              <Option value={1}>Visible</Option>
              <Option value={0}>Invisible</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Upload Logo"
            name="logoFile"
            rules={[
              {
                required: true,
              },
            ]}
            // initialValue={[
            // {
            //   url: brandDetail
            //     ? `https://springbe-production.up.railway.app/api/v1/brand/logo/${brandDetail.logo}`
            //     : "",
            // },
            // ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              accept=".jpg,.png,.gif"
              maxCount={1}
              beforeUpload={() => false}
            >
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space>
              {/* <Button type="primary" htmlType="submit">
                Submit
              </Button> */}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default withRouter(ListBrand);
