import "./MyProfile.scss";
import React, { useEffect, useState } from "react";
import {
  getKhachHang,
  updateKhachHang,
} from "../../redux/slice/khachhangSlice";
import {
  getListDiaChi,
  insertDiaChi,
  deleteDiaChi,
  updateDiaChi,
} from "../../redux/slice/diachiSlice";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  notification,
  Popconfirm,
  Select,
  Space,
} from "antd";

function MyProfile() {
  const dispatch = useDispatch();
  const { listDiaChi } = useSelector((state) => state.diachi);
  const [khachHang, setKhachHang] = useState();
  const [isModalOpenDiaChi, setIsModalOpenDiaChi] = useState(false);
  const [isModalOpenTT, setIsModalOpenTT] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [formDiaChi] = Form.useForm();
  const [idKH, setIdKH] = useState();
  const [diaChi, setDiaChi] = useState();
  const showModal = (data) => {
    setIsModalOpenDiaChi(true);
    if (data) {
      setDiaChi(data);
      formDiaChi.setFieldsValue({
        thanhpho: data.thanhpho?.trimEnd(),
        quanhuyen: data.quanhuyen?.trimEnd(),
        phuongxa: data.phuongxa?.trimEnd(),
        chitiet: data.chitiet?.trimEnd(),
      });
    } else {
      setDiaChi();
      formDiaChi.setFieldsValue({
        thanhpho: "",
        quanhuyen: "",
        phuongxa: "",
        chitiet: "",
      });
    }
  };
  const showModalTT = (khachHang) => {
    setIsModalOpenTT(true);
    const date = new Date(khachHang.ngaysinh);
    form.setFieldsValue({
      tenkhachhang: khachHang.tenkhachhang.trimEnd(),
      gioitinh: khachHang.gioitinh,
      sodienthoai: khachHang.sodienthoai.trimEnd(),
      email: khachHang.email.trimEnd(),
      ngaysinh: moment(date),
    });
  };
  const handleOk = () => {
    setIsModalOpenDiaChi(false);
  };

  const handleCancel = () => {
    setIsModalOpenDiaChi(false);
  };
  const handleCancelTT = () => {
    setIsModalOpenTT(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      setIdKH(userData.id);
      dispatch(getKhachHang(userData.id)).then((res) => {
        setKhachHang(res?.payload?.result);
      });
    }
  }, [dispatch]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);
      dispatch(getListDiaChi(userData.id));
    }
  }, [dispatch]);

  const confirm = (data) => {
    dispatch(deleteDiaChi(data?.idDiaChi)).then((res) => {
      if (res?.payload.result) {
        notification.open({
          message: "Thành công!",
          description: "Dữ liệu đã được cập nhật",
          type: "success",
        });
        const token = localStorage.getItem("token");
        if (token) {
          const userData = jwtDecode(token);
          dispatch(getListDiaChi(userData.id));
        }
      }
    });
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  const onFinish = (values) => {
    form.validateFields().then((values) => {
      dispatch(
        updateKhachHang({
          id: khachHang?.idKhachHang,
          tenkhachhang: values.tenkhachhang,
          gioitinh: values.gioitinh,
          sodienthoai: values.sodienthoai,
          email: values.email,
          ngaysinh: values.ngaysinh,
          trangthai: khachHang?.trangthai,
        })
      ).then((res) => {
        if (res.payload) {
          notification.open({
            message: "Thành công!",
            description: "Dữ liệu đã được cập nhật",
            type: "success",
          });
          setIsModalOpenTT(false);
          const token = localStorage.getItem("token");
          const userData = jwtDecode(token);
          dispatch(getKhachHang(userData.id)).then((res) => {
            setKhachHang(res?.payload?.result);
          });
        }
      });
    });
  };

  const onFinishDC = (values) => {
    console.log(diaChi);
    if (diaChi?.idDiaChi) {
      formDiaChi.validateFields().then((values) => {
        dispatch(
          updateDiaChi({
            thanhpho: values.thanhpho,
            quanhuyen: values.quanhuyen,
            phuongxa: values.phuongxa,
            chitiet: values.chitiet,
            idKhachHang: idKH,
            id: diaChi.idDiaChi,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            setIsModalOpenDiaChi(false);
            formDiaChi.resetFields();
            const token = localStorage.getItem("token");
            if (token) {
              const userData = jwtDecode(token);
              dispatch(getListDiaChi(userData.id));
            }
          }
        });
      });
    } else {
      formDiaChi.validateFields().then((values) => {
        dispatch(
          insertDiaChi({
            thanhpho: values.thanhpho,
            quanhuyen: values.quanhuyen,
            phuongxa: values.phuongxa,
            chitiet: values.chitiet,
            idKhachHang: idKH,
          })
        ).then((res) => {
          if (res.payload) {
            notification.open({
              message: "Thành công!",
              description: "Dữ liệu đã được cập nhật",
              type: "success",
            });
            setIsModalOpenDiaChi(false);
            formDiaChi.resetFields();
            const token = localStorage.getItem("token");
            if (token) {
              const userData = jwtDecode(token);
              dispatch(getListDiaChi(userData.id));
            }
          }
        });
      });
    }
  };
  return (
    <div className="my-profile">
      <div className="main">
        <div className="d-flex justify-content-between">
          <h2>Thông Tin Cá Nhân</h2>
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => showModalTT(khachHang)}
          />
        </div>
        <div className="card">
          <div className="card-body">
            <table>
              <tbody>
                <tr>
                  <td>Họ và Tên</td>
                  <td>:</td>
                  <td>{khachHang?.tenkhachhang}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{khachHang?.email}</td>
                </tr>
                <tr>
                  <td>Số điện thoại</td>
                  <td>:</td>
                  <td>{khachHang?.sodienthoai}</td>
                </tr>
                <tr>
                  <td>Ngày Sinh</td>
                  <td>:</td>
                  <td>{moment(khachHang?.ngaysinh).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <td>Giới Tính</td>
                  <td>:</td>
                  <td>{khachHang?.gioitinh == 1 ? "Nam" : "Nữ"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="d-flex justify-content-between">
          <h2>Danh Sách Địa Chỉ</h2>
          <PlusCircleOutlined style={{ color: "green" }} onClick={showModal} />
        </div>
        <div className="card">
          <div className="card-body">
            {listDiaChi?.map((i, index) => (
              <div className="justify-content-between d-flex col-11 mt-3">
                <p>
                  <b>{index + 1}. </b>
                  {i?.chitiet} - {i?.phuongxa} - {i?.quanhuyen} - {i?.thanhpho}
                </p>
                <div className="d-flex col-1 justify-content-between">
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirm(i)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      style={{ fontSize: "20px", color: "red" }}
                    />
                  </Popconfirm>

                  <EditOutlined
                    style={{ fontSize: "20px", color: "blue" }}
                    onClick={() => showModal(i)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        title="Thêm mới địa chỉ"
        open={isModalOpenDiaChi}
        footer={null}
        onCancel={handleCancel}
        width={900}
      >
        <Form
          form={formDiaChi}
          name="control-hooks"
          onFinish={onFinishDC}
          layout="vertical"
        >
          <Form.Item
            label="Tỉnh / Thành Phố"
            name="thanhpho"
            rules={[
              {
                required: true,
                message: "Khong de trong!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quận / Huyện"
            name="quanhuyen"
            rules={[
              {
                required: true,
                message: "Khong de trong!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phường / Xã"
            name="phuongxa"
            rules={[
              {
                required: true,
                message: "Khong de trong!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chi Tiết"
            name="chitiet"
            rules={[
              {
                required: true,
                message: "Khong de trong!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa thông tin"
        open={isModalOpenTT}
        onCancel={handleCancelTT}
        width={900}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="d-flex justify-content-between">
            <div style={{ width: "49%" }}>
              <Form.Item
                name="tenkhachhang"
                label="Tên Khách Hàng"
                rules={[
                  {
                    required: true,
                    message: "Tên khách hàng không bỏ trống",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: "49%" }}>
              <Form.Item
                name="ngaysinh"
                label="Ngày Sinh"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div style={{ width: "49%" }}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Email không thể trống",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: "49%" }}>
              <Form.Item
                name="sodienthoai"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không bỏ trống",
                  },
                  {
                    pattern: new RegExp(/^[0-9]{10}$/),
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div style={{ width: "49%" }}>
              <Form.Item
                name="gioitinh"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Chọn Giới tính">
                  <Option value={1}>Nam</Option>
                  <Option value={0}>Nữ</Option>
                </Select>
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
      </Modal>
    </div>
  );
}

export default MyProfile;
