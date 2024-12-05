/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Alert, Form, Input, message } from 'antd';
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';
import api from '../api/apiConfig';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [backendError, setBackendError] = useState<string | null>(null);

    const handleFinish = async (values: { username: string, email: string }) => {
        try {
            await api.post('/v1/auth/resetPassword', { username: values.username, email: values.email });
            setBackendError(null);
            message.success('ĐẶT LẠI MẬT KHẨU THÀNH CÔNG. Mật khẩu mới đã được gửi đến mail của bạn: ' + values.email, 10);
            navigate('/login');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const backendError = error.response.data.msg;
                console.log('Lỗi: ' + backendError);
                setBackendError(backendError);
            }
            message.error('ĐẶT LẠI MẬT KHẨU THẤT BẠI. Có vẻ như đã có lỗi xảy ra. Vui lòng thử lại!', 10);
        }
    };
    return (
        <main className="min-h-28 bg-white pt-10 pb-10 justify-center flex items-center px-4 sm:px-6 lg:px-8"
        >
            <div className="container max-w-lg w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-3">QUÊN MẬT KHẨU</h2>
                <p className='text-center mb-6'>Nhập tên tài khoản và email của bạn để đặt lại mật khẩu</p>
                {backendError && (
                    <Alert
                        className='mb-6'
                        message="ĐẶT LẠI MẬT KHẨU THẤT BẠI"
                        description="Tên tài khoản hoặc Email của bạn không đúng!"
                        type="error"
                        showIcon
                    />
                )}
                <Form
                    form={form}
                    name="forgot-password"
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{ email: '' }}
                >
                    <Form.Item
                        label="Tên tài khoản"
                        name="username"
                        rules={[
                            { required: true, message: 'Nhập tên tài khoản của bạn!' },
                        ]}
                    >
                        <Input placeholder="Nhập tên tài khoản của bạn" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Nhập email mà bạn đã đăng ký!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>
                    <Form.Item className='text-center pt-3'>
                        <Button
                            text="XÁC NHẬN"
                            bgColor="var(--soft-red)"
                            borderColor="white"
                            textColor="white"
                            onClick={() => { }}
                        />
                        <div className='pt-2'>
                            hoặc quay lại <a href="/login" className='text-soft-red font-semibold'> Đăng nhập</a>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
};
export default ForgotPassword;