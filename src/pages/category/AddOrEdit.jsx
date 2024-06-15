import React, { useEffect } from "react";
import withRouter from "../../helpers/withRouter";
import { Button, Form, Input, Select, Space, notification } from "antd";

import {
  getCategory,
  insertCategory,
  updateCategory,
} from "../../redux/slice/categorySlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

function AddOrEdit() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = (values) => {
    if (id) {
      form.validateFields().then((values) => {
        dispatch(
          updateCategory({
            name: values.name,
            id: Number(id),
            status: values.status,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-category");
          }
        });
      });
    } else {
      dispatch(insertCategory(values)).then((res) => {
        if (res.payload) {
          notification.open({
            message: "Thành công!",
            description: "Dữ liệu đã được cập nhật",
            type: "success",
          });
          navigate("/admin/list-category");
        }
      });
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getCategory(id)).then((res) => {
        if (id) {
          form.setFieldsValue({
            name: res.payload.name,
            status: res.payload.status === "Invisible" ? 1 : 0,
          });
        }
      });
    } else {
      form.setFieldsValue({
        name: "",
        status: 0,
      });
    }
  }, [dispatch, form, id]);

  return (
    <div className="add-category">
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
            {id ? "Update Category" : "Add Category"}
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
                <Form.Item
                  name="name"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
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
                    <Option value={0}>Visible</Option>
                    <Option value={1}>Invisible</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gender !== currentValues.gender
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("gender") === "other" ? (
                      <Form.Item
                        name="customizeGender"
                        label="Customize Gender"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
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

export default withRouter(AddOrEdit);
