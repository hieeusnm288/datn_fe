import { Button, Form, Input, Space, Upload, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getDetailBrand, insertBrand } from "../../redux/slice/brandSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import withRouter from "../../helpers/withRouter";
import { useEffect, useState } from "react";

function AddOrEditBrand() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [brandDetial, setBrandDetail] = useState({
    name: "",
    logo: "",
  });

  const onFinish = (values) => {
    form.validateFields().then((values) => {
      dispatch(
        insertBrand({
          name: values.name,
          logoFile: values.logoFile,
        })
      ).then((res) => {
        if (res.payload) {
          notification.open({
            message: "Thành công!",
            description: "Dữ liệu đã được cập nhật",
            type: "success",
          });
          navigate("/admin/list-brands");
        }
      });
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(getDetailBrand(id)).then((res) => {
        if (id) {
          form.setFieldsValue({
            name: res.payload.name,
          });
          setBrandDetail({
            logo: res.payload.logo,
          });
        }
      });
    } else {
      form.setFieldsValue({
        name: "",
      });
    }
  }, [id, form, dispatch]);
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[1]];
    }
    return e && e.fileList;
  };

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
          <h5 className="card-title fw-semibold mb-4">Add Brand</h5>
          <div
            className="card"
            style={{
              border: "none",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
            }}
          >
            <div className="card-body">
              <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="Brand Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Upload Logo"
                  name="logoFile"
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

export default withRouter(AddOrEditBrand);
