/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Alert, Form, Input, message } from 'antd';
import Button from '../components/button/Button';
// import { useNavigate } from 'react-router-dom';
import api from '../api/apiConfig';
import axios from 'axios';
// import { Content } from 'antd/es/layout/layout';
const ForgotPassword: React.FC = () => {
    const [backendError, setBackendError] = useState<string | null>(null);
    const [form] = Form.useForm();
    //const navigate = useNavigate();

    const handleFinish = async (values: { oldPassword: string; newPassword: string }) => {
        try {
            const response = await api.post('/v1/auth/changePassword', { oldPassword: values.oldPassword, newPassword: values.newPassword });
            console.log(response);
            message.success('Đổi mật khẩu thành công!');
            form.resetFields();
            // navigate('/OTPInput');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendError = error.response.data.msg;
                console.error("Login error:", backendError);
                message.error("ĐĂNG NHẬP THẤT BẠI.");
                setBackendError(backendError);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userId");
                localStorage.removeItem("username");
            }
            message.error("ĐỔI MẬT KHẨU THẤT BẠI. Vui lòng thử lại!", 10);
        }
    };
    return (
        <main
            className='max-w-screen min-h-28 bg-white pt-10 pb-10 justify-center items-center px-4 sm:px-6 lg:px-8'
        >
            <div className="container max-w-screen w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">THAY ĐỔI MẬT KHẨU</h2>
                <Form
                    form={form}
                    name="forgot-password"
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{ email: '' }}
                    className='max-w-screen justify-self-center'
                >
                    {backendError && (
                        <Alert
                            className="mb-6"
                            message="ĐỔI MẬT KHẨU THẤT BẠI"
                            description={backendError}
                            type="error"
                            showIcon
                        />
                    )}
                    <Form.Item
                        name="oldPassword"
                        label="Mật khẩu cũ"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu cũ của bạn!',
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
                        <Input.Password placeholder='Mật khẩu cũ' />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="Mật khẩu mới"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu mới của bạn!',
                            },
                            {
                                pattern:
                                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,100}$/,
                                message:
                                    "Mật khẩu phải dài ít nhất 7 kí tự, bao gồm cả chữ cái,chữ số và ký tự đặc biệt.",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('oldPassword') !== value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu mới phải khác mật khẩu cũ!'));
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Mật khẩu mới' />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Xác nhận mật khẩu"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Xác nhận mật khẩu của bạn!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Xác nhận mật khẩu của bạn không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='Xác nhận mật khẩu mới' />
                    </Form.Item>
                    <Form.Item className='text-center'>
                        <Button
                            text='Xác nhận'
                            bgColor='var(--soft-red)'
                            borderColor='white'
                            textColor='white'
                            onClick={() => handleFinish}
                        />
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
};
export default ForgotPassword;