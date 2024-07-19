import React, { useState, useEffect } from "react";
import { Button, Form, Input, Space, notification, Select } from "antd";
import { getPTTT, insertPTTT, updatePTTT } from "../../redux/slice/ptttSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function AddPTTT() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const onFinish = (values) => {
    if (id) {
      form.validateFields().then((values) => {
        dispatch(
          updatePTTT({
            id: id,
            hinhthuc: values.hinhthuc,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-pttt");
          }
        });
      });
    } else {
      form.validateFields().then((values) => {
        dispatch(
          insertPTTT({
            hinhthuc: values.hinhthuc,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            navigate("/admin/list-pttt");
          }
        });
      });
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(getPTTT(id)).then((res) => {
        console.log(res);
        if (id) {
          form.setFieldsValue({
            hinhthuc: res?.payload?.result.hinhthuc.trimEnd(),
          });
        }
      });
    } else {
      form.setFieldsValue({
        hinhthuc: "",
      });
    }
  }, [id, form, dispatch]);
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
          <h5 className="card-title fw-semibold mb-4">Thêm mới Phương Thức</h5>
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
                  name="hinhthuc"
                  label="Phương Thức Thanh Toán"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
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

export default AddPTTT;
