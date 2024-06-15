import { PlusOutlined } from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Form, Input, Select, Space, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getListCate } from "../../redux/slice/categorySlice";
import { getListBrand } from "../../redux/slice/brandSlice";
import {
  getDetailProduct,
  insertProduct,
  updateProduct,
} from "../../redux/slice/productSlice";
import withRouter from "../../helpers/withRouter";
const { Option } = Select;
function AddProduct() {
  const [specifications, setSpecifications] = useState("");
  const { listCategory } = useSelector((state) => state.category);
  const { listBrand } = useSelector((state) => state.brand);
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [productDetail, setProductDetail] = useState();
  const { id } = useParams();

  const onFinish = (values) => {
    if (id) {
      form.validateFields().then((values) => {
        dispatch(
          updateProduct({
            id: id,
            name: values.name,
            price: values.price,
            quantity: values.quantity,
            status: values.status,
            specifications: specifications,
            description: description,
            category_id: values.category,
            brand_id: values.brand,
            productFile: values.productFile,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-products");
          }
        });
      });
    } else {
      form.validateFields().then((values) => {
        dispatch(
          insertProduct({
            name: values.name,
            price: values.price,
            quantity: values.quantity,
            status: values.status,
            specifications: specifications,
            description: description,
            category_id: values.category,
            brand_id: values.brand,
            productFile: values.productFile,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-products");
          }
        });
      });
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(getDetailProduct(id)).then((res) => {
        if (id) {
          form.setFieldsValue({
            name: res.payload.name,
            status: res.payload.status,
            price: res.payload.price,
            quantity: res.payload.quantity,
            category: res.payload.category.id,
            brand: res.payload.brand.id,
            productFile: [
              {
                url: res.payload.image
                  ? `https://springbe-production.up.railway.app/api/v1/product/image/${res.payload.image}`
                  : "",
              },
            ],
          });
          // setProductDetail(res.payload);
          setDescription(res.payload.description);
          setSpecifications(res.payload.specifications);
        }
      });
    } else {
      form.setFieldsValue({
        name: "",
        status: 0,
        price: "",
        quantity: "",
        category_id: 1,
        brand_id: 1,
      });
      setDescription("");
      setSpecifications("");
    }
  }, [dispatch, form, id]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[1]];
    }
    return e && e.fileList;
  };

  useEffect(() => {
    dispatch(getListCate(0));
    dispatch(
      getListBrand({
        query: "",
        page: 0,
      })
    );
  }, [dispatch]);

  return (
    <div className="add-product">
      <div
        className="card"
        style={{
          border: "none",
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        }}
      >
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4">
            {id ? "Update Product" : "Add Product"}
          </h5>
          <div
            className="card"
            style={{
              border: "none",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <div className="card-body">
              <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                layout="vertical"
              >
                <div className="row">
                  <div className="col-6">
                    <Form.Item
                      name="name"
                      label="Product Name"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        {listCategory?.map((i) => (
                          <Option value={i.id}>{i.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      name="quantity"
                      label="Quantity"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      name="brand"
                      label="Brand"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        {listBrand?.map((i) => (
                          <Option value={i.id}>{i.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      name="price"
                      label="Price"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      name="status"
                      label="Status"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value={1}>Visible</Option>
                        <Option value={0}>Invisible</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      name="specifications"
                      label="Specifications"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={specifications}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "200px",
                              editor.editing.view.document.getRoot()
                            );
                          });
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setSpecifications(data);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={description}
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "200px",
                              editor.editing.view.document.getRoot()
                            );
                          });
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDescription(data);
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-6">
                    <Form.Item
                      label="Upload Image"
                      name="productFile"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        // action="/upload.do"
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
                  </div>
                </div>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AddProduct);
