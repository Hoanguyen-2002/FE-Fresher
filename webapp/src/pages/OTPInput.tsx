import React, { useState } from "react";
import { Alert, Button as AntButton, Form, message } from "antd";
import { InputOTP } from "antd-input-otp";
import Button from "../components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { verify } from "../api/authorization/verify";
import { resendOtp } from "../api/authorization/resendOtp";
import Countdown from "antd/lib/statistic/Countdown";
import api from "../api/apiConfig";

const OTPInput: React.FC = () => {
  const location = useLocation();
  const { email, username, password } = location.state || {};
  const [form] = Form.useForm();
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isCountdownActive, setIsCountdownActive] = useState<boolean>(true);

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = async (values: { otp: any }) => {
    const { otp } = values;
    if (!otp || otp.includes(undefined) || otp.includes(""))
      return form.setFields([
        {
          name: "otp",
          errors: ["Mã xác thực không hợp lệ hoặc không đúng."],
        },
      ]);
    const otpString = otp.join('');
    const returnValue = {
      email: email,
      otp: otpString,
    };
    const loginValues = {
      username: username,
      password: password,
    };
    try {
      const response = await verify(returnValue);
      console.log(response);
      setBackendError(null);
      message.success('XÁC THỰC THÀNH CÔNG. Giờ đây bạn có thể đăng nhập bằng tài khoản của mình.', 10);
      const loginResponse = await api.post('/v1/auth/login', loginValues);
      console.log(loginResponse)
      if (loginResponse) {
        localStorage.setItem("accessToken", loginResponse.data.data.content.accessToken);
        localStorage.setItem("refreshToken", loginResponse.data.data.content.refreshToken);
        localStorage.setItem("userId", loginResponse.data.data.content.userId);
        localStorage.setItem("username", loginResponse.data.data.content.username);
        setBackendError(null);
        message.success("ĐĂNG NHẬP THÀNH CÔNG");
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.msg;
        console.log("Lỗi: " + backendError);
        setBackendError(backendError);
      }
      message.error('XÁC THỰC THẤT BẠI. Có vẻ như mã xác thực của bạn không đúng hoặc đã có lỗi xảy ra. Vui lòng thử lại!', 10);
    };
  };

  const sendOtp = async () => {
    try {
      const response = await resendOtp(email);
      console.log(response);
      setBackendError(null);
      message.success(`GỬI LẠI MÃ XÁC THỰC THÀNH CÔNG. Hãy nhập mã xác thực mới được gửi đến email ${email} của bạn.`, 10);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendError = error.response.data.msg;
        console.log("Lỗi: " + backendError);
        setBackendError(backendError);
      }
      message.error('XÁC THỰC THẤT BẠI. Có vẻ như đã có lỗi xảy ra. Vui lòng thử lại!', 10);
      setDeadline(Date.now() + 1000 * 60 * 5);
      setIsCountdownActive(true);
    };
  }
  const [deadline, setDeadline] = useState<number>(Date.now() + 1000 * 60 * 3);

  const onFinish = () => {
    console.log('Countdown finished!');
    setDeadline(Date.now() + 1000 * 60 * 3);
    setIsCountdownActive(false);
  };
  return (
    <main
      className="min-h-28 bg-white pt-10 pb-10 justify-center flex items-center px-4 sm:px-6 lg:px-8"
    >
      <div className="container max-w-md w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <section className="card">
          {backendError && (
            <Alert
              className="mb-6"
              message="XÁC THỰC THẤT BẠI"
              description={backendError}
              type="error"
              showIcon
            />
          )}
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-3">KÍCH HOẠT TÀI KHOẢN</h2>
          <p className='text-center mb-6'>Nhập mã xác thực đã được gửi đến mail {email} của bạn</p>
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              rootClassName="text-center"
              name="otp"
              className="center-error-message"
              rules={[{ validator: async () => Promise.resolve() }]}
            >
              <InputOTP autoFocus inputType="numeric" length={6} />
            </Form.Item>

            <Form.Item className="text-center">
              <Button
                onClick={() => handleFinish}
                bgColor="var(--soft-red)"
                borderColor="var(--soft-red)"
                text="Xác nhận"
                textColor="white"
              />
            </Form.Item>
          </Form>

          {isCountdownActive ? (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <Countdown
                title="Bạn có thể gửi yêu cầu nhận lại mã xác thực sau"
                value={deadline}
                onFinish={onFinish}
                format="HH:mm:ss"
              />
            </div>
          ) : (
            <div className="text-center">
              <AntButton
                type="link"
                onClick={sendOtp}
                className="text-soft-red font-semibold"
              >
                Gửi lại mã
              </AntButton>
            </div>
          )}

        </section>
      </div>
    </main>
  );
};

export default OTPInput;
