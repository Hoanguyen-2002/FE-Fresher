import { Alert, Form, Input, message, Select } from "antd";
import axios from "axios";
import Button from "../components/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { register } from "../api/authorization/register";
import api from "../api/apiConfig";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [backendError, setBackendError] = useState<string | null>(null);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const formatedValues = {
      username: values.username,
      password: values.confirm,
      email: values.email,
      fullname: values.fullName,
      phone: `${values.prefix}${values.phone}`,
    };
    try {
      await api.post('/v1/auth/register',formatedValues);
      setBackendError(null);
      message.success(
        "ĐĂNG KÝ THÀNH CÔNG. Giờ đây bạn cần kích hoạt tài khoản của mình bằng mã kích hoạt đã được gửi đến email " +
          formatedValues.email,
        10
      );
      navigate("/verifyCodeInput", { state: { email: values.email, username: values.username, password: values.confirm } });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.msg;
        console.log("Lỗi: " + backendError);
        setBackendError(backendError);
      }
      message.error("ĐĂNG KÝ THẤT BẠI. Vui lòng thử lại!", 10);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="0">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <main className="min-h-28 bg-white pt-10 pb-10 justify-center flex items-center px-4 sm:px-6 lg:px-8">
      <div className="container max-w-md bg-white shadow-lg rounded-lg w-full lg:max-w-lg p-7">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ prefix: "0" }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          {backendError && (
            <Alert
              className="mb-6"
              message="ĐĂNG KÝ THẤT BẠI"
              description={backendError}
              type="error"
              showIcon
            />
          )}
          <h1 className="text-center mb-6 font-semibold text-lg">
            ĐĂNG KÝ TÀI KHOẢN
          </h1>
          <Form.Item
            name="username"
            label="Tên tài khoản"
            rules={[
              {
                required: true,
                message: "Nhập tên tài khoản của bạn!",
              },
              {
                pattern: /^[A-Za-z0-9]{6,20}$/,
                message:
                  "Tên tài khoản phải có ít nhất 6 kí tự gồm chữ cái và số.",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Nhập Họ và Tên của bạn!",
              },
              {
                pattern: /^.{1,50}$/,
                message: "Họ và tên không được vượt quá 50 kí tự.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                required: true,
                message: "Nhập email của bạn!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu của bạn!",
              },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,100}$/,
                message:
                  "Mật khẩu phải dài ít nhất 7 kí tự, bao gồm cả chữ cái,chữ số và ký tự đặc biệt.",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Xác nhận mật khẩu của bạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Xác nhận mật khẩu của bạn không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Nhập số điện thoại của bạn!" },
              {
                pattern: /^\d{9}$/,
                message: "Vui lòng nhập đúng 9 chữ số điện thoại (sau số 0).",
              },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <div className="text-center">
              <Button
                bgColor="var(--soft-red)"
                textColor="white"
                text="Đăng ký"
                onClick={() => {}}
              ></Button>
              <div className="pt-2">
                hoặc quay lại{" "}
                <a href="/login" className="text-soft-red font-semibold">
                  {" "}
                  Đăng nhập
                </a>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default Register;
